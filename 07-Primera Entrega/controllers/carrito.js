const Contenedor = require("./../contenedor");
const path = require("path");

async function getAllCartProducts(req,res){
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
    const contenedor = new Contenedor(path.join(__dirname,"..","data","carrito.txt"));
    let cart = await contenedor.getById(req.params.id);
    cart.push(req.body);
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
    const contenedor = new Contenedor(path.join(__dirname,"..","data","carrito.txt"));
    let cart = await contenedor.getById(req.params.id);
    cart = cart.filter((product) => product.id != req.params["id_prod"])
    await contenedor.updateById(cart,req.params.id);
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


