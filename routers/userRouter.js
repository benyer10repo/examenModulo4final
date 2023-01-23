const express = require("express"); //importamos express
const userRouter = express.Router(); //crea un router
const {getAllUsers,addUser,showUser,updateUser,deleteUser}= require("../controllers/User");


userRouter
    .route("/")
    .get(getAllUsers)
    .post(addUser);
userRouter
    .route("/:id")
    .get(showUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = userRouter;