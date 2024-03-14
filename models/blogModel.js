const { Schema, model } = require('mongoose')

const blogSchema = new Schema({
    title: { type: String, require: true },
    image: { type: String, require: true },
    description: { type: String, require: true }
}, { timestamps: true })


const blog = model('Blog',blogSchema)

module.exports = blog