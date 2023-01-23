const express = require("express"); //importamos express
const productRouter = express.Router(); //crea un router
const {getAllProducts, addProduct, showProduct, updateProduct, deleteProduct}= require("../controllers/Product");

productRouter
    .route("/")
    .get(getAllProducts)
    .post(addProduct);
productRouter
    .route("/:id")
    .get(showProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = productRouter;