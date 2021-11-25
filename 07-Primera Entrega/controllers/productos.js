const Contenedor = require("./../contenedor");
const path = require("path");


let administrador = true;

async function getAllProducts(req,res){

    if(!administrador){
        return res.status(400).json({
            success: false,
            message: "You don't have permissions"
        })
    }

    const contenedor = new Contenedor(path.join(__dirname,"..","data","productos.txt"));
    const productos = await contenedor.getAll();
    return res.status(200).json({
        success: true,
        data: productos
    })
}

async function getProduct(req,res){
    if(!administrador){
        return res.status(400).json({
            success: false,
            message: "You don't have permissions"
        })
    }

    const contenedor = new Contenedor(path.join(__dirname,"..","data","productos.txt"));
    const id = req.params.id;

    let isIdExistent = await contenedor.lookUpId(id)

    if(!isIdExistent){
        return res.status(400).json({
            error: `The product with id ${id} does not exist`
        })
    }



    const producto = await contenedor.getById(id);
    if(!producto){
        return res.status(400).json({
            error: "Product not found!"
        })
    }
    return res.status(200).json({
        success: true,
        data: producto
    })
}

async function createProduct(req,res){

    if(!administrador){
        return res.status(400).json({
            success: false,
            message: "You don't have permissions"
        })
    }

    const contenedor = new Contenedor(path.join(__dirname,"..","data","productos.txt"));
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

async function updateProduct(req,res){

    if(!administrador){
        return res.status(400).json({
            success: false,
            message: "You don't have permissions"
        })
    }

    const contenedor = new Contenedor(path.join(__dirname,"..","data","productos.txt"));


    let isIdExistent = await contenedor.lookUpId(req.params.id)

    if(!isIdExistent){
        return res.status(400).json({
            error: `The product with id ${req.params.id} does not exist`
        })
    }


    const productId = await contenedor.updateById(req.params.id,req.body);


    if(!productId){
        return res.status(400).json({
            error: "The product couldn't be updated because it doesn't exist"
        })
    }
    return res.status(200).json({
        success: true,
        data: productId
    })
}

async function deleteProduct(req,res){

    if(!administrador){
        return res.status(400).json({
            success: false,
            message: "You don't have permissions"
        })
    }

    const contenedor = new Contenedor(path.join(__dirname,"..","data","productos.txt"));

    let isIdExistent = await contenedor.lookUpId(req.params.id)

    if(!isIdExistent){
        return res.status(400).json({
            error: `The product with id ${req.params.id} does not exist`
        })
    }



    const productId = contenedor.deleteById(req.params.id);


    if(!productId){
        return res.status(400).json({
            error: "The product couldn't be deleted!"
        })
    }
    return res.status(200).json({
        success: true,
        data: productId
    })
}

module.exports = {
    getAllProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProduct
}


