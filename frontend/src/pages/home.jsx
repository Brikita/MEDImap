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
      <p className='catch-text'>Sometimes the people around you won't understand your journey, they don't need to, it's not for them. Please don't give up, I really believe in you. Check in with your emotional well-being. Engage and connect wisely with others.</p>
      <Footer />
    </>
  )
}

export default Home