const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodSchema = new Schema({
    foodId: {
        type: String,
    },
    restaurantId: {
        type: Number,   
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: { 
        type: String,
    },
    isVeg: {
        type: Boolean,
    },
    rating: {
        type: Number,   
    },
    image: {    
        type: String,
    } 
});
const Food = mongoose.model('Food', foodSchema);
module.exports = Food;