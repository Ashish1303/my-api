const dish = require('../models/Dish');

const getDishes = async (req, res) => {
  try {
    const dishes = await dish.find();
    res.status(200).json(dishes);
    } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

const getDishById = async (req, res) => {
    console.log(req.params.id);
  try {
    const dish = await dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postDish = async (req, res) => {
    console.log(req.body);
  const { name, description, price, restaurant } = req.body;
  const newDish = new dish({ name, description, price, restaurant });
  try {
    const savedDish = await newDish.save();
    res.status(201).json(savedDish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDishes,
  getDishById,
  postDish
};