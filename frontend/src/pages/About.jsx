import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Header from '../components/Header'
import Footer from '../components/Footer'
import http from '../lib/http'
import Spinner from '../components/Spinner'
const About = () => {
  const { handleSubmit, register } = useForm()
  const [isSubmitted, setIsSubmitted] = useState('')
  const [isLoading, setIsLoading] = useState('')


  const onSubmit = async ({ name, email, content }) => {
    setIsSubmitted(false)
    setIsLoading(true)
    const payload = { name, email, content };
    try {
      const res = await http.post('/api/feedback', { data: payload });
      const response = res.data;
      setIsSubmitted(true)
      setIsLoading(false)
      alert('Feedback submitted successfully!');
      console.log(response);
    } catch (err) {
      console.error(err);
      alert('Error submitting feedback. Please try again later.');
    }
  };

  return (
    <div>
      <Header />
      <h1>MEDImap</h1>
      <section className='feedback-section'>
        <p>Welcome to MEDImap, a compassionate platform dedicated to empowering mental health and fostering overall well-being. We provide a safe and supportive space with resources, a community, helplines, and therapeutic tools for individuals facing mental health challenges. MEDImap follows a user-centered approach, offering personalized support and expert-curated information. Join us on this transformative journey towards embracing mental well-being and unlocking the strength within. Let's MEDImap together.
        </p>
      </section>
      {!isSubmitted ? <section className='feedback-form'>
        <h2>Submit Feedback</h2>
        <h4>Your Feedback is valuable to us. Please consider leaving a message</h4>
        <div className="card-feedback">
          <span className="title">Leave a Comment</span>
          <form className="form-feedback" onSubmit={handleSubmit(onSubmit)}>
            <div className="group">
              <input placeholder="‎" type="text" required {...register('name')} />
              <label htmlFor="name">Name</label>
            </div>
            <div className="group">
              <input placeholder="‎" type="email" id="email" name="email" required {...register('email')} />
              <label htmlFor="email">Email</label>
            </div>
            <div className="group">
              <textarea placeholder="‎" id="comment" name="comment" rows="5" required {...register('content')}></textarea>
              <label htmlFor="comment">Comment</label>
            </div>
            <button type="submit">Submit</button>
            {isLoading && <div><Spinner /> <p>Submitting Please wait...</p></div>}
          </form>
        </div>

      </section> :
        <div className='card-feedback-submit'>
          <p>Submitted. Thanks for the feedback ;&gt;)</p>
        </div>
      }
      <section>
        <Link to='/' >Back to Login</Link>
      </section>
      <Footer />
    </div>
  )
}

export default About