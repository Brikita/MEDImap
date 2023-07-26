const bcrypt = require('bcrypt')
const User = require('../Models/Users');

//get all professionals
const getUsersByRole = async (req, res) => {
    try {
        const users = await User.find({ roles: 'professional' });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

//get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};
//get user by id
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};



module.exports = {
    getUsersByRole,
    getUserById,
    getAllUsers,
};