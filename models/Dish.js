const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  restaurant: {
    type: String,
    ref: 'Restaurant',
    required: true
  }
});

module.exports = mongoose.model('Dish', dishSchema);