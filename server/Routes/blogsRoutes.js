const express = require('express')
const router = express.Router()
const {getAllBlogs,
    getBlogById,
    postBlog} = require('../Controllers/blogsControllers')

// define blog endpoints

//get all blogs
router.get('/', getAllBlogs)


//get one blog with the author
router.get('/:blog_id', getBlogById)



//post a blog
router.post('/blog', postBlog)



//get


module.exports = router