const { Schema, model } = require('mongoose')

const jobSchema = new Schema({
    title: { type: String, require: true },
    experience: { type: String, require: true },
    opening: { type: String, require: true },
    description: { type: String, require: true }
})


const jobs = model('Job', jobSchema)

module.exports = jobs