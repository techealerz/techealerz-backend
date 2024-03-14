const training = require("../models/trainingModel")


const createTrainingUser = async (req, res) => {
    const { firstName, lastName, email, phone, experience, highestQualification } = req.body
    try {
        const data = new training({
            firstName,
            lastName,
            email,
            phone,
            experience,
            highestQualification
        })
        await data.save()
        return res.status(201).json({ message: 'User created', success: true })
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

const getAllTrainingUsers = async (req, res) => {
    try {
        console.log('data ')
        const data = await training.find()
        console.log('backend : ', data)
        return res.status(200).json({ users: data, success: true })
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}


module.exports = { createTrainingUser, getAllTrainingUsers }