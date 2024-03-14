const user = require("../models/userModel")
const nodemailer = require('nodemailer')

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

// Create

const addUser = async (req, res) => {
    const { firstName, lastName, email, phone, currentCompany, totalExperience, currentCTC, expectedCTC, portfolioLink, currentLocation, noticePeriod } = req.body
    console.log('req file is : ', req.file)
    try {
        const userData = await user.findOne({ email })
        if (userData) {
            const nD = new Date().getMonth
            const uD = new Date(userData.updatedAt).getMonth
            if (uD - nD >= 5) {
                console.log('date block entered')
                const updateUser = await user.findOneAndUpdate({ _id: userData._id }, {
                    firstName,
                    lastName,
                    email,
                    phone,
                    currentCompany,
                    totalExperience,
                    currentCTC,
                    expectedCTC,
                    portfolioLink,
                    currentLocation,
                    noticePeriod
                })
                const info = await transporter.sendMail({
                    from: process.env.USEREMAIL, // sender address
                    to: "hr@techealerz.com", // list of receivers
                    subject: "New Applicant", // Subject line
                    text: `Hi HR,

                    You've recieved an application regarding the post of ... Please respond to the applicant to know more about his/her skillset.



                    Thanks & Regards,
                    TecHealerz Solutions Pvt Ltd.`,
                    attachments: [{
                        filename: `${firstName} resume.pdf`,
                        path: req.file.path,
                        contentType: 'application/pdf'
                    }]// plain text body
                    // html: "<b>Hello world?</b>", // html body
                });
                // mail to applicant
                const newMail = await transporter.sendMail({
                    from: {
                        address: `${email}`
                    },
                    to: email,
                    subject: 'Your Application Response',
                    text: `Hi ${firstName} ${lastName},
                    
                    I hope this mail finds you well. Thanks for finding out a great opportunity in you life. We'll get back to you shortly after a brief analylis of your profile.
                    
                    
                    Thanks & Regards,
                    Hardik Sharma
                    HR Manager`
                })
                return res.status(204).json({ message: "Application submitted successfully", success: true })
            } else {
                throw new Error("You can apply again after 6 months")
            }

        } else {
            const data = new user({
                firstName,
                lastName,
                email,
                phone,
                currentCompany,
                totalExperience,
                currentCTC,
                expectedCTC,
                portfolioLink,
                currentLocation,
                noticePeriod
            })
            await data.save()
            // mail to hr 
            const info = await transporter.sendMail({
                from: process.env.USEREMAIL, // sender address
                to: "hr@techealerz.com", // list of receivers
                subject: "New Applicant", // Subject line
                text: `Hi HR,

                You've recieved an application regarding the post of ... Please respond to the applicant to know more about his/her skillset.



                Thanks & Regards,
                TecHealerz Solutions Pvt Ltd.`,
                attachments: [{
                    filename: `${firstName} ${lastName} resume.pdf`,
                    path: req.file.path,
                    contentType: 'application/pdf'
                }]// plain text body
                // html: "<b>Hello world?</b>", // html body
            });
            // mail to applicant
            const newMail = await transporter.sendMail({
                from: {
                    name: 'TecHealerz Solutions',
                    address: `info@techealerz.com`
                },
                to: email,
                subject: 'Your Application Response',
                text: `Hi ${firstName} ${lastName},
                    
                I hope this mail finds you well. Thanks for finding out a great opportunity in you life. We'll get back to you shortly after a brief analylis of your profile.
                    
                    
                Thanks & Regards,
                Hardik Sharma
                HR Manager`
            })
            return res.status(201).json({ message: "Application submitted successfully", success: true })
        }
    } catch (error) {
        console.log('error is : ', error)
        return res.status(400).json({ message: error.message, success: false })
    }
}

// Read

const getUsersData = async (req, res) => {
    try {
        const data = await user.find()
        return res.status(200).json({ applicants: data })
    } catch (error) {
        return res.status(404).json({ message: error.message, success: false })
    }
}


const updateUser = async (req, res) => {
    const { id, hrApproval, adminApproval } = req.body
    console.log(req.body)
    try {
        const userData = await user.findOne({ _id: id })
        if (userData) {
            const updUser = await user.findOneAndUpdate({ _id: id }, {
                hrApproval,
                adminApproval
            })
            return res.status(200).json({ success: true, msg: "User updated successfully" })
        }
    } catch (error) {
        res.status(500).json({ error, success: false })
    }
}


module.exports = { addUser, getUsersData, updateUser }