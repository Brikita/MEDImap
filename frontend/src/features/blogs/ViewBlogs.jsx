import React from 'react'
import { useSelector } from "react-redux";
import { selectBlogsById } from './blogsApiSlice';
import { Link, useParams } from 'react-router-dom';

const ViewBlogs = ({ blogId }) => {
  const {id: userId} = useParams()
  const blog = useSelector(state => selectBlogsById(state, blogId))
  const date = new Date(blog.createdAt);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = date.toLocaleString('en-US', options); 
  const content = blog.content;
  const words = content.split(' ');
  let truncatedContent = words.slice(0, 50).join(' ');
  if (words.length > 100) {
    truncatedContent += '...';
  }
  console.log(truncatedContent);
  return (
    <div className='blog-container'>
      <Link to={`/dash/${userId}/blogs/${blogId}`}><h2>{blog.title}</h2></Link>
      <p>{truncatedContent}</p>
      <span className='date-span'>{formattedDate}</span>
      <hr />
    </div>
  )
}

export default ViewBlogs