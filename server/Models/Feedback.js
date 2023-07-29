const mongoose = require('mongoose')


const Feedback = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Feedback', Feedback)
