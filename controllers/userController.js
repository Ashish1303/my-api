  const User = require('../models/user');
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');
  const user = require('../models/user');
  const secret = 'GharKaBite_ _secret_key';

const getUsers =async (req, res) => {
 try {   const users = await User.find();
   res.json(users);
 } catch (error) {
   console.error('Error fetching users:', error);
   res.status(500).json({ message: 'Failed to fetch users' });
 }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};


const postUser = async (req, res) => {
  console.log('Received user data:', req.body);
  const newUser = new User(req.body);

  const passwordHash = await bcrypt.hash(req.body.password, 10);
  newUser.password = passwordHash;

  try {
    // const savedUser = await newUser.save();
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    });
     const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added successfully!", data: savedUser });
    
    // res.status(201).json({ message: 'User created successfully', user: savedUser.id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: error.errmsg });
  }
};
const getUserByEmail = async (req, res) => {
  console.log('Received email query:', req.query);
  const { email,password } = req.query;
  try {
    const user = await User.findOne({ email });
    // console.log('Fetched user:', user);
    if (user.password !== password) {
      return res.status(404).json({ message: 'User not found' });
    }  else {
      // res.json({ name, email });
      return res.status(200).json({ message: 'User found', name: user.name, email: user.email });

    }  
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }  
   
};
const generateToken = (user) => jwt.sign({ id: user.id }, secret, { expiresIn: '12h' });
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authorization required' });
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const getUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      console.log('Generated JWT token:', token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      const tokenL = generateToken(user);
      // res.send(user).select("email name _id");
  return res.json({ tokenL, user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile } });

    } else {
      throw new Error("Invalid credentials");
    }

   
  } catch (err) {
   res.status(401).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  getUserLogin,
  getUserByEmail,
  logout,
  generateToken,
  authMiddleware
};
