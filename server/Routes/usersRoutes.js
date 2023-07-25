const express = require('express')
const router = express.Router()
const {
    getUsersByRole,
    getUserById,
    createUser,
} = require('../Controllers/usersControllers')


//get all professionals
router.get('/professionals', getUsersByRole)



//get user by Id
router.get('user/:id', getUserById)



//post user details
router.post('/user', createUser)




//

module.exports = router