
import { useGetBlogsQuery } from "./blogsApiSlice";
import ViewBlogs from "./ViewBlogs";


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
    if (isLoading) content = <p>Loading....</p>

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