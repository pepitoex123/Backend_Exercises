const Contenedor = require("../daos/filesystem/contenedor");
const path = require("path");




async function renderVistaProductos(req,res){
    const contenedor = new Contenedor(path.join(__dirname,"..","data","productos.txt"))
    const arrayProductos = await contenedor.getAll();
    const listExists = true;
    if(!(arrayProductos.length > 0)){
        const listExists = false;
    }
    res.render("vistaProductos",{
        array: arrayProductos,
        listExists
    })
}

async function renderFormularioProductos(req,res){
    res.render("formularioProductos")
}


module.exports = {
    renderVistaProductos,
    renderFormularioProductos
}