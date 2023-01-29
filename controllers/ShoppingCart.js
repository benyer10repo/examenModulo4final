const { model } = require("mongoose");
const ShoppingCart = require("../models/ShoppingCart");
const catchAsync = require("../utils/catchAsync");//para los errores



//LISTADO
const getAllCart = catchAsync(async(req, res) => {
    const shoppingcart = await ShoppingCart.find();//consulta a BD
    res.status(200).json({
        status: "ok",
        data: shoppingcart,
    });
});


//AÑADIR AL CARRITO SEGUN CONDICION
const addCart = catchAsync(async(req, res) => {

    let usuario=await ShoppingCart.findOne({user: req.body.user});//consultamos si el usuario ya esta en la base de datos
    let cont="";//variable para mensaje del estado
    if(usuario!=null)
    {//si la conuslta es distinto a null
        let estadousuario=await ShoppingCart.findOne({user: usuario.user,status:"PENDING"});//consultamos DB si este usuario tiene PENDING
        if(estadousuario.status=="PENDING")
        {//agreamos al carrito existente
            
            let newCart= await ShoppingCart.findById(estadousuario._id);//consultamos DB o agarrammos al carrito que se añadira
            for(var i=0 ; i < req.body.products.length ; i++)
            {//para ingresar al carrito varios o un producto
                newCart.products.push({ productId: req.body.products[i].productId, quantity: req.body.products[i].quantity, price: req.body.products[i].price});//añadimos al array del carrito
            }
            newCart.totalAmount = newCart.products.length;// cantidad de productos calculo automatico
            newCart = await newCart.save();//guardamos los cambios
            

           cont="pendiente y agregamos al carrito existente";//mensaje
           

           res.status(200).json({
            status: "ok",
            dataInserted: newCart,
            ESTADO: cont,
            });

        }
        else
        {// el estado es PAID creamos otro carrito de compra
            let newCart= new ShoppingCart();
            newCart.invoiceNumber = req.body.invoiceNumber;//numero de factura
            newCart.status = req.body.status;//estado PENDING | PAID
            newCart.totalAmount = req.body.products.length;// cantidad de productos calculo automatico
            newCart.user = req.body.user;//id del usuario
            newCart.products = req.body.products;
            newCart = await newCart.save();

            cont="pagado y creamos nuevo carrito";

            res.status(200).json({
                status: "ok",
                dataInserted: newCart,
                ESTADO: cont,
                });

        }
    }
    else
    {//creamos otro carrito de compras por que el usuario no existe
        let newCart= new ShoppingCart();
        newCart.invoiceNumber = req.body.invoiceNumber;//numero de factura
        newCart.status = req.body.status;//estado PENDING | PAID
        newCart.totalAmount = req.body.products.length;// cantidad de productos calculo automatico
        newCart.user = req.body.user;//id del usuario
        newCart.products = req.body.products;
        newCart = await newCart.save();

        cont="sin registro y creamos nuevo carrito";

        res.status(200).json({
            status: "ok",
            dataInserted: newCart,
            ESTADO: cont,
        });
    }

    

    
});




//ELIMINAR PRODUCTOS DEL CARRITO
const deleteCart = catchAsync(async(req, res) => {

    let idproducto = req.params.id;//variable donde agarramos id
    let carrito = await ShoppingCart.findOne({status: "PENDING"});//select carrito segun estado pendiente
    
    if(carrito!=null)
    {//existe carrito en estado PENDING
        let itemIndex = carrito.products.findIndex((p) => p.productId == idproducto);//accedemos al array y buscamos segun el ID producto

        if (itemIndex > -1) 
        {//si hay producto nos tetorna la posicion del index
            carrito.products.splice(itemIndex, 1);//eliminamos un producto segun index
            carrito.totalAmount = carrito.products.length;// cantidad de productos calculo automatico
            carrito = await carrito.save();
    
            res.status(200).json({
                status: "DELETE ok",
                data: carrito,itemIndex,
            });
            
        }
        else
        {//si no hay nos retorna el index en estado -1
            res.status(400).json({
                status: "error",
                message: "El producto no existe para remover del carrito",
                itemIndex
            });
        }

    }
    else
    {//cuando es null la consulta por q no hay en estado PENDING
        res.status(400).json({
            status: "error",
            message: "El producto no existe para remover del carrito"
        });
    }
        

});


//PAGA EL CARRITO QUE ESTE EN ESTADO PENDIENTE CON MINIMO UN PRODUCTO
const pagoCart = catchAsync(async(req, res) => {

    let carrito = await ShoppingCart.findOne({status: "PENDING"});//select carrito segun estado pendiente

    if(carrito!=null)
    {
        let item = carrito.products.length;//count de items

        if (item > 0) 
        {
            carrito.status = "PAID";
            carrito.totalAmount = carrito.products.length;// cantidad de productos calculo automatico
            carrito = await carrito.save();

            res.status(200).json({
            status: "PAID ok",
            data: carrito,item
            });
        }
        else
        {
            res.status(400).json({
                status: "error",
                message: "No hay carrito por pagar"
            });
        }
    }
    else
    {
        res.status(400).json({
            status: "error",
            message: "No hay carrito por pagar"
        });
    }
    

      

});




module.exports={
    getAllCart,
    addCart,
    deleteCart,
    pagoCart,
}
