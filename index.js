const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Product = require("./models/Product"); //importar modelo product
const User = require("./models/User"); //importar modelo product
const productRouter = require("./routers/productRouter"); //llamamos a la ruta
const userRouter = require("./routers/userRouter"); //llamamos a la ruta
const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/api/v1/product/", productRouter);//instanciamos ruta fija o raiz
app.use("/api/v1/user/", userRouter);//instanciamos ruta fija o raiz


app.listen(process.env.PORT, () => {
    console.log(`App funcionando en el puerto  ${process.env.PORT}`);
});


//conectarme a mongoose
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, {}).then(async(con) => {
    console.log("conectado a la data base mongoDB");
    
}).catch((err) => {

});