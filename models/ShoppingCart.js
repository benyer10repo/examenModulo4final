const mongoose = require("mongoose");

const shoppingcartSchema = new mongoose.Schema({
   
    invoiceNumber: {
        type: String
    },
    status:{
        type: String
    },
    totalAmount: {
        type: Number
    },
    user: {
        type: String
    },
    products: [
        {
            productId: {type: String},
            quantity: {type: Number},
            price: {type: Number},
        },
    ],

});


const shoppingcartModel = mongoose.model("shoppingcart", shoppingcartSchema);
module.exports = shoppingcartModel;
