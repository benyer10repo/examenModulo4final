
const { model } = require("mongoose");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");//para los errores
const jwt = require("jsonwebtoken");//libreria token
const crypto = require("crypto");
const { promisify } = require("util");//

//autentificacion del usuario
const login = catchAsync(async (req, res) => {

    let { email, password }=req.body;
    if (!email || !password) {
        throw new Error("Por favor ingrese email y password");
    }

    const user = await User.findOne({ email });//select segun email
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")
    if (!user || user.password !== hashedPassword) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: user._id, email, firstName: user.firstName, lastName: user.lastName },
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const cookieOptions = {
        expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }

    res.cookie("jwt", token, cookieOptions)

    res.status(200).json({
        status: "ok",
        token,
    });
});

//registrar usuario
const register = catchAsync(async (req, res) => {
    let { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
        throw new Error("Por favor complete la informacion para su registro");
    }
    const user = new User();
    user.email = email;
    user.password = crypto.createHash("sha256").update(password).digest("hex");
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();

    res.status(200).json({
        status: "ok",
        message: "User created",
    });
});

//protejer rutas
const protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization;
    } else {
        throw new Error("Por Favor Inicie Session");
    }
    const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);

    console.log(decoded);
    req.user = decoded;
    next();
    
});




module.exports = {
    login,
    register,
    protect,
}