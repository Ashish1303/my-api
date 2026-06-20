const Restaurant = require('../models/Restaurant');
 const getRestaurants= async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ message: 'Failed to fetch restaurants' });
    }
};   

const getRestaurantById = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findById(id);   
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).json({ message: 'Failed to fetch restaurant' });
    }
};

const postRestaurant = async (req, res) => {
    console.log('Received restaurant data:', req.body);
    const newRestaurant = new Restaurant(req.body);
    try {
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ message: 'Failed to create restaurant' });
    }
};

module.exports = {
    getRestaurants,
    getRestaurantById,
    postRestaurant
};