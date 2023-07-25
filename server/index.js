const express = require('express')
const app = express()


const connectDB = require('./DB/connectDB')
const blogRouters = require('./Routes/blogsRoutes')
const userRouters = require('./Routes/usersRoutes')
// connect to db
connectDB()

//middleware
app.use(express.json())



//routes
app.use('/api', blogRouters)
app.use('/api', userRouters)



// listen
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})