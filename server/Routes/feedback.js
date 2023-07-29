const express = require('express')
const router = express.Router()
const Feedback = require('../Models/Feedback.js')


router.post('/feedback', async (req, res) => {
    const { name, email, content } = req.body;
    try {
      if (!name || !email || !content) {
        return res.status(400).send('Name, email, and content are required');
      }
       const feedback = new Feedback({
        name,
        email,
        content
      });
       const postedFeedback = await feedback.save();
       res.status(200).send('Feedback submitted successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error submitting feedback');
    }
  });

module.exports = router