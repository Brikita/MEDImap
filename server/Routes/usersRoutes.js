const express = require('express');
const router = express.Router();
const {
  getUsersByRole,
  getUserById,
  getAllUsers,
} = require('../Controllers/usersControllers');
 // Get all professionals
router.get('/professionals', getUsersByRole);
 // Get user by Id
router.get('/user/:id', getUserById);
router.get('/users', getAllUsers);
 // Post user details

 module.exports = router;