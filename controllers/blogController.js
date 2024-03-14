

// Create

const blog = require("../models/blogModel")

const createBlog = async (req, res) => {
    const { title, image, description } = req.body
    console.log('req body is : ', req.body)
    try {
        const data = new blog({
            title,
            image,
            description
        })
        await data.save()
        return res.status(201).json({ message: "Blog Created", success: true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'Network Error', success: true })
    }
}

// Read blogs

const getBlogs = async (req, res) => {
    try {
        const blogs = await blog.find()
        return res.status(200).json({ blogs, success: true })
    } catch (error) {
        return res.status(500).json({ message: "Network Error", success: false })
    }
}

// Delete Blogs

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params
        console.log('id is : ', id)
        const d = await blog.findByIdAndDelete({ _id: id })
        console.log('d : ', d)
        return res.status(202).json({ message: "Blog Deleted", success: true })
    } catch (error) {
        console.log('error ', error)
        return res.status(500).json({ message: "Network Error", success: false })
    }
}


module.exports = { createBlog, getBlogs, deleteBlog }


