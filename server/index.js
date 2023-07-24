const express = require('express')
const app = express()


const connectDB = require('./DB/connectDB')
// connect to db
connectDB()

//middleware




// listen
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})