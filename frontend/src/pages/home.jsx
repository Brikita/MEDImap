import React from 'react'
import SignupForm from '../components/SignUpForm'

import HomePageText from '../components/HomePageText'
import './home.css'

const Home = () => {
  return (
    <div className='home-page'>
      <HomePageText />
      <SignupForm />
    </div>
  )
}

export default Home