const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    inventory: {
        type: Number,
        required: true,
        default: 0
    },
    unit: {
        type: String,
        required: true
    },

});

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;