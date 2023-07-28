import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Profile from './pages/dash/Profile.jsx'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/dash/Home'
import ReadBlog from './pages/dash/ReadBlog.jsx'
import CreateBlog from './pages/dash/CreateBlog.jsx'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
       <Route index element={<Home />} />
       <Route path='/blogs/:blogId' element={<ReadBlog />} />
        
          <Route path='new' element={<CreateBlog />} />
          <Route path='/view/:profId' element={<Profile />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App