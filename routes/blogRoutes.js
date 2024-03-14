const { createBlog, getBlogs, deleteBlog } = require('../controllers/blogController')

const router = require('express').Router()

router.post('/api/v1/createBlog', createBlog)
    .get('/api/v1/getBlogs', getBlogs)
    .delete('/api/v1/deleteBlog/:id', deleteBlog)

module.exports = router