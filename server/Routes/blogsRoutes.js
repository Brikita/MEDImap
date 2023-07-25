const express = require('express')
const router = express.Router()
const {getAllBlogs,
    getBlogById,
    postBlog} = require('../Controllers/blogsControllers')

// define blog endpoints

//get all blogs
router.get('/blogs', getAllBlogs)


//get one blog with the author
router.get('/blogs/:blog_id', getBlogById)



//post a blog
router.post('/blogs', postBlog)



//get


module.exports = router