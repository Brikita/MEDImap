import React from 'react'
import { useSelector } from "react-redux";
import { selectBlogsById } from './blogsApiSlice';
import { Link } from 'react-router-dom';

const ViewBlogs = ({blogId}) => {
    const blog = useSelector(state => selectBlogsById(state, blogId))
  return (
    <div>
        <Link to={`/dash/blogs/${blogId}`}><h2>{blog.title}</h2></Link>
        <p>{blog.content}</p>
    </div>
  )
}

export default ViewBlogs