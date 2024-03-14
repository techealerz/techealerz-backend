const { Schema, model } = require('mongoose')

const trainingSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: String,
    email: { type: String, require: true },
    phone: String,
    experience: String,
    highestQualification: String
})

const training = model('training', trainingSchema)

module.exports = training