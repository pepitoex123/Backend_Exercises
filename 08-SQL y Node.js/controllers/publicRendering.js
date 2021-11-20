const Contenedor = require("./../contenedor");
const path = require("path");




async function renderLoginTableProductos(req,res){
    const contenedor = new Contenedor(path.join(__dirname,"..","data","productos.txt"))
    const arrayProductos = await contenedor.getAll();
    const listExists = true;
    if(!(arrayProductos.length > 0)){
        const listExists = false;
    }
    res.render("loginTable",{
        array: arrayProductos,
        listExists
    })
}


module.exports = {
    renderLoginTableProductos
}