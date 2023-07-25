const express = require('express');
const router = express.Router();
const {
  getUsersByRole,
  getUserById,
  createUser,
} = require('../Controllers/usersControllers');
 // Get all professionals
router.get('/professionals', getUsersByRole);
 // Get user by Id
router.get('/user/:id', getUserById);
 // Post user details
router.post('/user', createUser);
 module.exports = router;