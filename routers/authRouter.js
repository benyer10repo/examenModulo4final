const express = require("express");
const authRouter = express.Router();
const { login, register, } = require("../controllers/Auth");

authRouter
    .route("/login")
    .post(login);
    authRouter
    .route("/register")
    .post(register);



module.exports = authRouter;