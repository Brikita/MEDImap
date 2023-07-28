import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import http from '../../lib/http'
import './createBlog.css'
import { useNavigate, useParams } from 'react-router-dom'
const CreateBlog = () => {
    const {id: userId} = useParams()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    
   /*  const reset = () => {
        setTitle("")
        setContent('')
    } */
    const onSubmit = async ({title, author, content}) => {

        const payload = {title, author, content}

        await http.post("/api/blogs/blog", {data: payload})
    
        navigate(`/dash/${userId}`)
    }


    return (
        <div className='create-blog-page'>

            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                <div className="form">
                    <span className="heading">Your Blog</span>
                    <input
                        placeholder="Author"
                        id='author'
                        name='author'
                        value={userId}
                        type="text"
                        className="input"
                        {...register('author')}
                        
                    />
                    <input
                        placeholder="Title"
                        id="title"
                        type="text"
                       /*  value={title} */
                        name='title'
                        className="input"
                        onChange={(e) => setTitle(e.target.value)}
                        {...register('title')}
                    />
                    <textarea
                        placeholder="your content"
                        rows="40"
                        cols="100"
                        id="content"
                       /*  value={content} */
                        name="content"
                        className="textarea"
                        onChange={(e) => setContent(e.target.value)}
                        {...register('content')}
                    />
                    <div className="button-container">
                        <button
                            type='submit'
                            className="send-button"

                        >Submit</button>
                        <div className="reset-button-container">
                            <div
                                id="reset-btn"
                                className="reset-button"
                                onClick={()=>navigate(`/dash/${userId}`)}
                            >Back</div>
                        </div>
                    </div>
                </div>
            </form>
            <div className='img-div'>
                <h1>
                    Under Construction!!!
                </h1>
               </div>
        </div>
    )
}

export default CreateBlog