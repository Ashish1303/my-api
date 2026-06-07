const express = require('express');
const router = express.Router();
const { getFoods, getFoodById, postFood} = require('../controllers/foodController');

router.get('/foods', getFoods);
router.get('/foods/:id', getFoodById);
router.post('/foods', postFood);

module.exports = router;
