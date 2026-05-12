  const User = require('../models/user');

const getUsers = (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  res.json({ id, name: `User ${id}` });
};
const postUser = async (req, res) => {
  console.log('Received user data:', req.body);
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser.id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: error.errmsg });
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser
};
