import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectBlogsById } from '../../features/blogs/blogsApiSlice'
import Axios from 'axios'


const ReadBlog = () => {
    const {id: blogId} = useParams()
    const blog = useSelector(state => selectBlogsById(state, blogId))
    const [author, setAuthor] = useState(null)

    useEffect(()=> {
        const fetchUser = async () => {
            const response = await Axios.get(`http://localhost:5000/api/users/user/${blog.author}`)
            setAuthor(response.data)
        }
        fetchUser()
    }, [blogId])
    console.log(author);
  return (
    <div>
        <h1>{blog.title}</h1>
        {author && <p>By: {author.firstName} {author.lastName}</p>}

        <p>{blog.content}</p>

        <div>
            <span>{blog.createdAt}</span>
        </div>

    </div>
    
  )
}

export default ReadBlog