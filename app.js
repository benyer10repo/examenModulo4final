const express = require("express");
const morgan = require("morgan");

const productRouter = require("./routers/productRouter"); //llamamos a la ruta
const userRouter = require("./routers/userRouter"); //llamamos a la ruta
const authRouter = require("./routers/authRouter"); //llamamos a la ruta
const shoppingcartRouter = require("./routers/shoppingcartRouter"); //llamamos a la ruta
const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/api/v1/products/", productRouter);//instanciamos ruta fija o raiz
app.use("/api/v1/users/", userRouter);//instanciamos ruta fija o raiz
app.use("/api/v1/auth/", authRouter);//instanciamos ruta fija o raiz
app.use("/api/v1/cart/", shoppingcartRouter);//instanciamos ruta fija o raiz

app.all("*", (req, res, next) => {
    throw new Error('route not found');
});

app.use((err, req, res, next) => {
    res.status(400).json({
        status: "error",
        message: err.message,
    });
});







//exportar a server.js

module.exports = app;



