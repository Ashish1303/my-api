const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/allRestaurants', restaurantController.getRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.post('/addRestaurant', restaurantController.postRestaurant);

module.exports = router;