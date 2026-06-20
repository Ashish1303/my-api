const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
    {
        name:String,
        image:String,
        rating:Number,
        cuisine:String,
        deliveryTime:String
    },{timestamps:true}
);
module.exports = mongoose.model('Restaurant', restaurantSchema);