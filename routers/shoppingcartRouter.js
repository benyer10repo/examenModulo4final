const express = require("express"); //importamos express
const shoppingcartRouter = express.Router(); //crea un router
const {getAllCart,addCart,deleteCart,pagoCart}= require("../controllers/ShoppingCart");
const { login, signup, protect } = require("../controllers/Auth");//llamamos controlador para proteger atraves de la funcion protect


shoppingcartRouter
    .route("/")
    .all(protect)//aplicamos la proteccion
    .get(getAllCart);

shoppingcartRouter
    .route("/product")
    .all(protect)//aplicamos la proteccion
    .post(addCart);

shoppingcartRouter
    .route("/product/:id")
    .all(protect)//aplicamos la proteccion
    .delete(deleteCart);

shoppingcartRouter
    .route("/pay")
    .all(protect)//aplicamos la proteccion
    .post(pagoCart);


    module.exports = shoppingcartRouter;