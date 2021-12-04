const mongoose = require("mongoose");
const {Schema} = mongoose;
const {productSchema} = require("./Product");

const cartSchema = new Schema({
    id: mongoose.ObjectId,
    title: String,
    price: Number,
    products: [productSchema],
    timestamp: {
        type: Date,
        default: Date.now
    }
})


const Cart = mongoose.model("Cart",cartSchema);


module.exports = Cart
