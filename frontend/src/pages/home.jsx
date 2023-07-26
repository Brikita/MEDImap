import React from 'react'
import SignupForm from '../components/SignUpForm'
import Header from '../components/Header'
import Footer from '../components/Footer'

import HomePageText from '../components/HomePageText'
import './home.css'

const Home = () => {
  return (
    <>
      <Header />

      <div className='home-page'>
        <HomePageText />
        <SignupForm />
      </div>
      <Footer />
    </>
  )
}

export default Home