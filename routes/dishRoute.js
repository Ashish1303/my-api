const express = require('express');
const router = express.Router();
const { getDishes, getDishById, postDish } = require('../controllers/dishController');

router.get('/dishes', getDishes);
router.get('/dishes/:id', getDishById);
router.post('/dishes', postDish);

module.exports = router;