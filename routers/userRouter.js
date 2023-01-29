const express = require("express"); //importamos express
const userRouter = express.Router(); //crea un router
const {getAllUsers,addUser,showUser,updateUser,deleteUser}= require("../controllers/User");
const { login, signup, protect } = require("../controllers/Auth");//llamamos controlador para proteger atraves de la funcion protect

userRouter
    .route("/")
    .all(protect)//aplicamos la proteccion
    .get(getAllUsers)
    .post(addUser);
userRouter
    .route("/:id")
    .all(protect)//aplicamos la proteccion
    .get(showUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = userRouter;