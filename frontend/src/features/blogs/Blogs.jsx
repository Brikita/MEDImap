
import { useGetBlogsQuery } from "./blogsApiSlice";
import ViewBlogs from "./ViewBlogs";
import Spinner from "../../components/Spinner";


import React from 'react'

const Blogs = () => {
    const {
        data: blogs,
        isSuccess,
        isLoading,
        isError,
        error
    } = useGetBlogsQuery()

    let content
    if (isLoading) content = <div className="spinner"><Spinner /></div>

    if(isError) content = <p>{error}</p>

    if(isSuccess) {
        const {ids} = blogs

        content = ids?.length
        ? ids.map(blog => <ViewBlogs key={blog} blogId={blog}  />)
        : <h1>No Blogs</h1>
    }
  return content
}

export default Blogs