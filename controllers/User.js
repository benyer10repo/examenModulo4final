const { model } = require("mongoose");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");//para los errores
const crypto = require("crypto");

//listar
const getAllUsers = catchAsync(async(req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: "ok",
        data: users,
    });
});

//añadir
const addUser= catchAsync(async(req, res) => {
    let newUser = new User();
    newUser.email = req.body.email;
    newUser.password = crypto.createHash("sha256").update(req.body.password).digest("hex");
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser = await newUser.save();

    res.status(200).json({
        status: "ok",
        dataInserted: newUser,
    });
});

//mostrar segun id
const showUser = catchAsync(async(req, res) => {
    console.log('Request Id:', req.params.id);
    const users = await User.findById(req.params.id);
    res.status(200).json({
        status: "ok",
        data: users,
    });
});

//modificar 
const updateUser = catchAsync(async(req, res) => {
    console.log('Request Id:', req.params.id);
    let udUser = await User.findById(req.params.id);
    udUser.email = req.body.email;
    udUser.password = crypto.createHash("sha256").update(req.body.password).digest("hex");
    udUser.firstName = req.body.firstName;
    udUser.lastName = req.body.lastName;
    udUser = await udUser.save();

    res.status(200).json({
        status: "UPDATE ok",
        data: udUser,
    });
});

//eliminar 

const deleteUser = catchAsync(async(req, res) => {
    console.log('Request Id:', req.params.id);
    const users = await User.findById(req.params.id).remove();
    res.status(200).json({
        status: "DELETE ok",
        data: users,
    });
});



module.exports={
    getAllUsers,
    addUser,
    showUser,
    updateUser,
    deleteUser
}
