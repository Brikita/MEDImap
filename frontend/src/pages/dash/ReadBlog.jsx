import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBlogsById } from '../../features/blogs/blogsApiSlice';
import Axios from 'axios';
import http from '../../lib/http'
const ReadBlog = () => {
  const { blogId: blogId } = useParams();
  const { id: UserId } = useParams();
  const navigate = useNavigate();
  //const blog = useSelector((state) => selectBlogsById(state, blogId));
  const [author, setAuthor] = useState(null);
  const [blog, setBlog] = useState(null);
  useEffect(()=> {
    const fetchBlog = async() => {
      const res = await http.get(`/api/blogs/blog/${blogId}`)
      console.log(res.data);
      setBlog(res.data)
    }
    fetchBlog()
  }, [])
   useEffect(() => {
    let isMounted = true;
     const fetchUser = async () => {
      try {
        const response = await Axios.get(
          `https://mediserver.onrender.com/api/users/user/${blog.author}`
        );
        if (isMounted) {
          setAuthor(response.data);
        }
      } catch (error) {
        console.error(error);
        // Handle error state or display error message
      }
    };
     fetchUser();
     return () => {
      isMounted = false;
    };
  }, [blogId]);
   const formattedDate = blog?.createdAt ? new Date(blog.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';
   return (
    <div className='read-blog'>
      <h1>{blog?.title}</h1>
      {author && <p>By: {author.firstName} {author.lastName}</p>}
      <p>{blog?.content}</p>
      <div>
        <span>{formattedDate}</span>
      </div>
      <button onClick={() => navigate(`/dash/${UserId}`)}>
        Back to Home
      </button>
    </div>
  );
};
 export default ReadBlog;