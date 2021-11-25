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


    let isIdExistent = await contenedor.lookUpId(id)

    if(!isIdExistent){
        return res.status(400).json({
            error: `The cart with id ${id} does not exist`
        })
    }


    const carrito = await contenedor.getById(id);

    if(!carrito){
        return res.status(400).json({
            error: "The cart has not been found!"
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

    const cartToCreate = {
        ...req.body,
        productos: []
    }


    const id = await contenedor.save(cartToCreate);
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
            error: "The product wasn't able to be updated"
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

    let isIdExistent = await contenedor.lookUpId(cartId)

    if(!isIdExistent){
        return res.status(400).json({
            error: `The cart with id ${cartId} does not exist`
        })
    }



    if(!cartId){
        return res.status(400).json({
            error: "The cart couldn't be deleted!"
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


    let isIdExistent = await contenedor.lookUpId(req.params.id)

    if(!isIdExistent){
        return res.status(400).json({
            error: `The cart with id ${req.params.id} does not exist`
        })
    }




    let cart = await contenedor.getById(req.params.id);
    console.log("El carrito es: " ,cart);
    cart.productos = cart.productos.filter((product) => product?.id !== req.params["id_prod"])
    let isProductFound = cart.productos.find((product) => product?.id === req.params["id_prod"])

    if(!isProductFound){
        return res.status(400).json({
            error: `The product with id ${req.params["id_prod"]} does not exist`
        })
    }


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


