const superUser = require("../models/superUserModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.USEREMAIL,
        pass: process.env.USERAPP,
    },
});


const createUser = async (req, res) => {
    const { username, password, confirmPassword, email, role } = req.body

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password Does not match", success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10)
        const data = new superUser({
            username,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
            email,
            role
        })
        await data.save()
        return res.status(201).json({ message: 'User Created', success: true })
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}


const login = async (req, res) => {
    const { username, password, role } = req.body
    let emailTo = ''
    if(role === 'admin'){
        emailTo = 'dr.preetiraitilak@gmail.com'
    }else if(role==='hr'){
        emailTo = 'hr@techealerz.com'
    }
    try {
        const data = await superUser.findOne({ username })
        if (data.role !== role) {
            console.log('role : ', role)
            console.log('data.role', data.role)
            return res.status(401).json({ meassge: 'Unauthorized User', success: false })
        }
        const verifyPassword = await bcrypt.compare(password, data.password)
        if (verifyPassword) {
            // const token = await jwt.sign({ id: data._id }, process.env.JWTSECRET)
            // res.cookie('jwtToken', token, {
            //     httpOnly: true
            // })
            const userOTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
            const info = await transporter.sendMail({
                from: process.env.USEREMAIL, // sender address
                to: emailTo, // list of receivers
                subject: "TecHealerz Login OTP", // Subject line
                text: `Your OTP for TecHealerz Login is : ${userOTP}`,
                // attachments: [{
                //     filename: `${firstName} resume.pdf`,
                //     path: req.file.path,
                //     contentType: 'application/pdf'
                // }]// plain text body
                // html: "<b>Hello world?</b>", // html body
            });
            const hashedUserOTP = await bcrypt.hash(userOTP, 10)
            const updateOTP = await superUser.findByIdAndUpdate({ _id: data._id }, { otp: hashedUserOTP }, { upsert: true })
            return res.status(200).json({ message: 'User login', success: true })
        } else {
            return res.status(401).json({ message: "Invalid credentials", success: false })
        }

    } catch (error) {
        return res.status(401).json({ error: error.message, success: false })
    }
}


const checkOTP = async (req, res) => {
    const { otp, username, password } = req.body
    try {
        // const strOTP = otp.toString()
        const data = await superUser.findOne({username})
        const verifyOTP = await bcrypt.compare(otp, data.otp)
        if (verifyOTP) {
            const token = await jwt.sign({ id: data._id }, process.env.JWTSECRET)
            res.cookie('jwtToken', token, {
                httpOnly: true
            })
            return res.status(200).json({ message: 'user login', success: true })
        }
        return res.status(401).json({ message: 'Invalid OTP', success: false })
    } catch (error) {
        console.log('error is : ',error)
        return res.status(500).json({ error, success: false })
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie('jwtToken', {
            httpOnly: true
        })
        return res.status(200).json({ message: "user successfully logged out", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Network Error", success: false })
    }
}

module.exports = { createUser, login, logout,checkOTP }