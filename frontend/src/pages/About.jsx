import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div>
      <Header />
      <h1>MEDImap</h1>
      <section classNameName='feedback-section'>
        <p>Welcome to MEDImap, a compassionate platform dedicated to empowering mental health and fostering overall well-being. We provide a safe and supportive space with resources, a community, helplines, and therapeutic tools for individuals facing mental health challenges. MEDImap follows a user-centered approach, offering personalized support and expert-curated information. Join us on this transformative journey towards embracing mental well-being and unlocking the strength within. Let's MEDImap together.
        </p>
      </section>
      <section className='feedback-form'>
        <h2>Submit Feedback</h2>
        <h4>Your Feedback is valuable to us. Please consider leaving a message</h4>
        <div className="card-feedback">
          <span className="title">Leave a Comment</span>
          <form className="form-feedback">
            <div className="group">
              <input placeholder="‎" type="text" required="" />
              <label for="name">Name</label>
            </div>
            <div className="group">
              <input placeholder="‎" type="email" id="email" name="email" required="" />
              <label for="email">Email</label>
            </div>
            <div className="group">
              <textarea placeholder="‎" id="comment" name="comment" rows="5" required=""></textarea>
              <label for="comment">Comment</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>

      </section>
      <section>
        <Link to='/' >Back to Login</Link>
      </section>
      <Footer />
    </div>
  )
}

export default About