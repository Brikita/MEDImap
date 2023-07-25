const express = require('express');
const cors = require('cors')
const app = express();
 const connectDB = require('./DB/connectDB');
const blogRoutes = require('./Routes/blogsRoutes');
const userRoutes = require('./Routes/usersRoutes');
 // Connect to the database
connectDB();
 // Middleware
app.use(express.json());
app.use(cors())
 // Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
 // Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});