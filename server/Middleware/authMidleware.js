/* const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookies('jwt') // <-- Error: should be req.cookies('jwt')
    // check if it exists and is valid
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.redirect('/')
                console.log(err.message)
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/')
    }
}
module.exports = {
    requireAuth
} */