const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database!');
   /*  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    }); */
  } catch (error) {
    console.error('Connection error:', error);
  }
};
module.exports = connectDB;