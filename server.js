const mongoose = require("mongoose");
const Product = require("./models/Product"); //importar modelo product
const User = require("./models/User"); //importar modelo product
const ShoppingCart = require("./models/ShoppingCart"); //importar modelo product
const app = require("./app");//requerimos el app


process.on("uncaughException", (err) => {
    console.log("uncaughException", err);
    console.log("shutting down");
    process.exit(1);
});




//conectarme a mongoose
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, {}).then(async(con) => {
    console.log("conectado a la data base mongoDB");
    
}).catch((err) => {
    console.log(err);
});





const server = app.listen(process.env.PORT, () => {
    console.log(`App funcionando en el puerto  ${process.env.PORT}`);
});

//errores async
process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection", err);
    console.log("shutting down");
    server.close(() => {
        process.exit(1)
    });
});