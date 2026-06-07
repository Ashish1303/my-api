const Food = require('../models/food');

const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();    
    res.json(foods);
    } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Failed to fetch foods' });
  } 
};

const getFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }   res.json(food); 
    } catch (error) {
    console.error('Error fetching food:', error);
    res.status(500).json({ message: 'Failed to fetch food' });
  }
};

const postFood = async (req, res) => {
    console.log('Received food data:', req.body);
    const newFood = new Food(req.body);
    try {
      const savedFood = await newFood.save();
      res.status(201).json({ message: 'Food created successfully', food: savedFood.id });
    } catch (error) {
      console.error('Error creating food:', error);
      res.status(500).json({ message: error.errmsg });
    }
};

module.exports = {
  getFoods,
  getFoodById,
  postFood
};