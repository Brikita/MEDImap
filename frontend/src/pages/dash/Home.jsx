import React from 'react'
import Blogs from '../../features/blogs/Blogs'
import Professionals from '../../features/user/Professionals'
import { Link, useParams } from 'react-router-dom'

const Home = () => {
  const {id: userId} = useParams()
  return (
    <div>
      <h1 className='home-H1'>WELCOME. IT'S Ok NOT to BE <strong>OK!</strong> </h1>
      <div className='home-container'>
        <div><Professionals /></div>
        <div className='blogs-column-container'>
          <div> </div>
          <h2 className='h2'>Read These Interesting Articles to calm your Mind or <Link to={`/dash/${userId}/new`}><span>create one</span></Link></h2>
          <Blogs /></div>
      </div>
    </div>
  )
}

export default Home
