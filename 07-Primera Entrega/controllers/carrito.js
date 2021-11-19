const Contenedor = require("./../contenedor");
const path = require("path");
const uuid = require("uuid");


let administrador = true;

async function getAllCartProducts(req,res){

    if(!administrador){
        return res.status(400).json({
            success: false,
            message: "You don't have permissions"
        })
    }

    const contenedor = new Contenedor(path.join(__dirname,"..","data","carrito.txt"));
    const carrito = await contenedor.getById(req.params.id);

    return res.status(200).json({
        success: true,
        data: {
                ...carrito
            }
    })
}

async function getCart(req,res){

    if(!administrador){
        return res.status(400).json({
            success: false,
            message: "You don't have permissions"
        })
    }



    const contenedor = new Contenedor(path.join(__dirname,"..","data","carrito.txt"));
    const id = req.params.id;
    const carrito = await contenedor.getById(id);
    if(!carrito){
        return res.status(400).json({
            error: "Carrito no encontrado!"
        })
    }
    return res.status(200).json({
        success: true,
        data: carrito
    })
}

async function createCart(req,res){


    if(!administrador){
        return res.status(400).json({
            success: false,
            message: "You don't have permissions"
        })
    }



    const contenedor = new Contenedor(path.join(__dirname,"..","data","carrito.txt"));
    if(!req.body){
        return res.status(400).json({
            error: "Please send POST data correctly"
        })
    }
    console.log(req.body);
    const id = await contenedor.save(req.body);
    return res.status(200).json({
        success: true,
        data: id
    })
}

async function createCartProduct(req,res){

    if(!administrador){
        return res.status(400).json({
            success: false,
            message: "You don't have permissions"
        })
    }

    const producto = req.body;

    producto.id = uuid.v4();
    producto.timestamp = Date.now();




    const contenedor = new Contenedor(path.join(__dirname,"..","data","carrito.txt"));
    let cart = await contenedor.getById(req.params.id);
    cart?.productos.push(producto);
    const cartId = await contenedor.updateById(req.params.id,cart);
    if(!cartId){
        return res.status(400).json({
            error: "No se pudo actualizar el producto"
        })
    }
    return res.status(200).json({
        success: true,
        data: cartId
    })
}

async function deleteCart(req,res){


    if(!administrador){
        return res.status(400).json({
            success: false,
            message: "You don't have permissions"
        })
    }


    const contenedor = new Contenedor(path.join(__dirname,"..","data","carrito.txt"));
    const cartId = await contenedor.deleteById(req.params.id);
    if(!cartId){
        return res.status(400).json({
            error: "No se pudo eliminar el carrito!"
        })
    }
    return res.status(200).json({
        success: true,
        data: cartId
    })
}

async function deleteCartProduct(req,res) {

    if(!administrador){
        return res.status(400).json({
            success: false,
            message: "You don't have permissions"
        })
    }



    const contenedor = new Contenedor(path.join(__dirname,"..","data","carrito.txt"));
    let cart = await contenedor.getById(req.params.id);
    console.log("El carrito es: " ,cart);
    cart.productos = cart.productos.filter((product) => product?.id !== req.params["id_prod"])
    await contenedor.updateById(req.params.id,cart);
    return res.status(200).json({
        success: true,
        data: cart.id
    })
}

module.exports = {
    getAllCartProducts,
    getCart,
    deleteCart,
    deleteCartProduct,
    createCart,
    createCartProduct
}


