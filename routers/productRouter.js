const express = require("express"); //importamos express
const productRouter = express.Router(); //crea un router
const {getAllProducts, addProduct, showProduct, updateProduct, deleteProduct}= require("../controllers/Product");
const { login, signup, protect } = require("../controllers/Auth");//llamamos controlador para proteger atraves de la funcion protect
productRouter
    .route("/")
    .all(protect)//aplicamos la proteccion
    .get(getAllProducts)
    .post(addProduct);
productRouter
    .route("/:id")
    .all(protect)
    .get(showProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = productRouter;