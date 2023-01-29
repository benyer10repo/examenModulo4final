const { model } = require("mongoose");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");//para los errores

//listar
const getAllProducts = catchAsync(async(req, res) => {
    const products = await Product.find();
    res.status(200).json({
        status: "ok",
        data: products,
    });
});

//añadir
const addProduct = catchAsync(async(req, res) => {
    let newProduct = new Product();
    newProduct.name = req.body.name;
    newProduct.price = req.body.price;
    newProduct.unit = req.body.unit;
    newProduct.inventory = req.body.inventory;
    newProduct = await newProduct.save();

    res.status(200).json({
        status: "ok",
        dataInserted: newProduct,
    });
});

//mostrar segun id
const showProduct = catchAsync(async(req, res) => {
    console.log('Request Id:', req.params.id);
    const products = await Product.findById(req.params.id);
    res.status(200).json({
        status: "ok",
        data: products,
    });
});


//modificar producto
const updateProduct = catchAsync(async(req, res) => {
    console.log('Request Id:', req.params.id);
    let udProduct = await Product.findById(req.params.id);
    udProduct.name = req.body.name;
    udProduct.price = req.body.price;
    udProduct.unit = req.body.unit;
    udProduct.inventory = req.body.inventory;
    udProduct = await udProduct.save();

    res.status(200).json({
        status: "UPDATE ok",
        data: udProduct,
    });
});

//eliminar producto

const deleteProduct = catchAsync(async(req, res) => {
    console.log('Request Id:', req.params.id);
    const products = await Product.findById(req.params.id).remove();
    res.status(200).json({
        status: "DELETE ok",
        data: products,
    });
});




module.exports={
    getAllProducts,
    addProduct,
    showProduct,
    updateProduct,
    deleteProduct,
}