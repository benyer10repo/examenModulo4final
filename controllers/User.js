const { model } = require("mongoose");
const User = require("../models/User");


//listar
const getAllUsers = async(req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: "ok",
        data: users,
    });
}

//añadir
const addUser= async(req, res) => {
    let newUser = new User();
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser = await newUser.save();

    res.status(200).json({
        status: "ok",
        dataInserted: newUser,
    });
}

//mostrar segun id
const showUser = async(req, res) => {
    console.log('Request Id:', req.params.id);
    const users = await User.findById(req.params.id);
    res.status(200).json({
        status: "ok",
        data: users,
    });
}

//modificar 
const updateUser = async(req, res) => {
    console.log('Request Id:', req.params.id);
    let udUser = await User.findById(req.params.id);
    udUser.email = req.body.email;
    udUser.password = req.body.password;
    udUser.firstName = req.body.firstName;
    udUser.lastName = req.body.lastName;
    udUser = await udUser.save();

    res.status(200).json({
        status: "UPDATE ok",
        data: udUser,
    });
}

//eliminar 

const deleteUser = async(req, res) => {
    console.log('Request Id:', req.params.id);
    const users = await User.findById(req.params.id).remove();
    res.status(200).json({
        status: "DELETE ok",
        data: users,
    });
}



module.exports={
    getAllUsers,
    addUser,
    showUser,
    updateUser,
    deleteUser
}
