const mongoose = require("mongoose");
const {Schema} = mongoose;



const productSchema = new Schema({
    id: mongoose.ObjectId,
    title: String,
    thumbnail: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    price: Number,
})


const Product = mongoose.model("Product", productSchema);


module.exports = {
    Product,
    productSchema
}