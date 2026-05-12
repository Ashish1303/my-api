const express = require('express');
const router = express.Router();
const { getUsers, getUserById, postUser } = require('../controllers/userController');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', postUser);

module.exports = router;
