const Contenedor = require("./../contenedor");
const path = require("path");

async function getAllProducts(req,res){
    const contenedor = new Contenedor(path.join(__dirname,"..","data","productos.txt"));
    const productos = await contenedor.getAll();
    return res.status(200).json({
        success: true,
        data: productos
    })
}

async function getProduct(req,res){
    const contenedor = new Contenedor(path.join(__dirname,"..","data","productos.txt"));
    const id = req.params.id;
    const producto = await contenedor.getById(id);
    if(!producto){
        return res.status(400).json({
            error: "Producto no encontrado!"
        })
    }
    return res.status(200).json({
        success: true,
        data: producto
    })
}

async function createProduct(req,res){
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
    const contenedor = new Contenedor(path.join(__dirname,"..","data","productos.txt"));
    const productId = await contenedor.updateById(req.params.id,req.body.data);
    if(!productId){
        return res.status(400).json({
            error: "No se pudo actualizar el producto"
        })
    }
    return res.status(200).json({
        success: true,
        data: productId
    })
}

async function deleteProduct(req,res){
    const contenedor = new Contenedor(path.join(__dirname,"..","data","productos.txt"));
    const productId = contenedor.deleteById(req.params.id);
    if(!productId){
        return res.status(400).json({
            error: "No se pudo eliminar el producto!"
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


