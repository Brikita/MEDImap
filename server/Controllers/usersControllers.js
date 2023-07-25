const User = require('./User');

//get all professionals
const getUsersByRole = async (req, res) => {
    try {
        const users = await User.find({ role: 'professional' });
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
// post new user
const createUser = async (req, res) => {
    const { firstName, lastName, email, password, roles } = req.body;

    try {
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            roles,
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

module.exports = {
    getUsersByRole,
    getUserById,
    createUser,
};