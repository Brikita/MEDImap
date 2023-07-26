const express = require('express');
const cors = require('cors')
const app = express();
const connectDB = require('./DB/connectDB');
const blogRoutes = require('./Routes/blogsRoutes');
const userRoutes = require('./Routes/usersRoutes');
const User = require('./Models/Users.js')
// Connect to the database
connectDB();
// Middleware
app.use(express.json());
app.use(cors())
// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);


// signup
app.post('/api/signup', async (req, res) => {
  // post new user

  const { firstName, lastName, email, password, roles } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.json({ status: 'error', error: 'All fields are required' })
  }

  if (password.length < 6) {
    res.json({status:'error', error:'Password too short'})
  }

  try {
    // Generate a salt to use for hashing the password
    const salt = await bcrypt.genSalt(10);

    // Hash the user's password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with the hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roles,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
})


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});