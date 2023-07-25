

const Blog = require('../Models/Blogs');
const User = require('../Models/Users');


const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve blogs' });
    }
};




//get a blog by its Id
const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id).populate('author', 'firstName lastName');
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve blog' });
    }
};


//post a blog
const postBlog = async (req, res) => {
    const { title, content, author } = req.body;
  
    try {
      const newBlog = new Blog({
        title,
        content,
        author,
      });
  
      await newBlog.save();
  
      res.status(201).json({ message: 'Blog posted successfully', blog: newBlog });
    } catch (error) {
      res.status(500).json({ error: 'Failed to post blog' });
    }
  };




module.exports = {
    getAllBlogs,
    getBlogById,
    postBlog,
};