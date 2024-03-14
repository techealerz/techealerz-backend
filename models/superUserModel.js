const { Schema, model } = require('mongoose')


const superUserSchema = new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    confirmPassword: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, require: true },
    otp: String
})


const superUser = model('SuperUser', superUserSchema)

module.exports = superUser