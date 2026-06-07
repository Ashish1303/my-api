const express = require('express');
const router = express.Router();
const { getUsers, getUserById, postUser,  getUserByEmail, getUserLogin, logout   } = require('../controllers/userController');

router.get('/users', getUsers);
router.get('/user', getUserByEmail);
router.get('/users/:id', getUserById);
router.post('/signup', postUser);
router.post('/login', getUserLogin);
router.post('/logout', logout);


module.exports = router;
