const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    firstName: { type: String, require: true, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, require: true, unique: true },
    phone: { type: Number, require: true },
    currentCompany: { type: String },
    totalExperience: { type: String },
    currentCTC: { type: String },
    expectedCTC: { type: String },
    portfolioLink: { type: String, trim: true },
    currentLocation: { type: String, trim: true },
    noticePeriod: { type: String },
    hrApproval: { type: String, default: 'pending' },
    adminApproval: { type: String, default: 'pending' }
}, { timestamps: true })

const user = model('User', userSchema)

module.exports = user