require('dotenv').config()
const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const asyncHandler =  require('express-async-handler')
const app = express();
const connectDB = require('./DB/connectDB');
const blogRoutes = require('./Routes/blogsRoutes');
const userRoutes = require('./Routes/usersRoutes');
const feedbackRoute = require('./Routes/feedback')
const User = require('./Models/Users.js')
// Connect to the database
connectDB();

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};


// Middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors(corsOptions));

// Authenication
const requireAuth = asyncHandler(async(req, res, next) => {
  const token = req.cookies.jwt // <-- Error: should be req.cookies('jwt')
  // check if it exists and is valid
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect('http://localhost:5173/')
        console.log(err.message)
      } else {
        console.log(decodedToken)
        next()
      }
    })
  } else {
    res.redirect('http://localhost:5173/')
  }
})
// Routes
app.use('/api', feedbackRoute);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

// jwt
const expTime = 4 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({ id },
    process.env.JWT_SECRET,
    { expiresIn: expTime })
}

app.get('/', (req, res) => {
  res.send({message: "Welcome to Brian's API"})
})

app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, roles } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password too short' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roles,
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: 345600 });
    console.log(token);

    res.cookie('jwt', token, { httpOnly: true, maxAge: 345600000, sameSite: 'None' });
    res.status(201).json({ newUser })
    
  } catch(err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

//login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
     const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(404).json({ status: 'error', error: 'No user found! Create an account' });
    }
     const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ status: 'error', error: 'Invalid username/password' });
    }
     const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 345600000 });
    res.status(200).json({user})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
});

// Change Password
app.post('/api/recover', async (req, res) => {
  try {
    const { token, newPassword: plainPassword } = req.body

    const password = await bcrypt.hash(plainPassword, 10)

    const user = jwt.verify(token, process.env.JWT_SECRET)
    const _id = user.id
    await User.updateOne(
      { _id },
      {
        $set: { password }
      }
    )
    res.status(200).json({ status: 'ok' })
  } catch (error) {

  }
})

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});








/* app.get('/api/send-cookie', (req, res) => {
  res.cookie('myCookie', 'cookieValue', { maxAge: 3600000, httpOnly: true });
  res.send('Cookie sent!');
}); */