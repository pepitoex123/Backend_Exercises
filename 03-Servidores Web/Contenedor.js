const fs = require("fs");


class Contenedor {
    constructor(nombreArchivo){
        this.ruta = nombreArchivo;
        this.id = 1;
    }

    getAll = async () => {
        try{
            const contenido = await fs.promises.readFile(this.ruta,"utf-8");
            return JSON.parse(contenido);
        }catch(error){
            await fs.promises.writeFile(this.ruta,JSON.stringify([],null,2));
            const contenido = await fs.promises.readFile(this.ruta,"utf-8");
            return JSON.parse(contenido);
        }
    }

    save = async(product) => {
        const arrProductos = await this.getAll();
        product["id"] = this.id;
        ++this.id;
        arrProductos.push(product);
        try{
            await fs.promises.writeFile(this.ruta,JSON.stringify(arrProductos,null,2))
            return product.id;
        }catch(error){
            return "No se pudo guardar el producto";
        }
    }

    getById = async id => {
        const arrProductos = await this.getAll();

        const productoBuscado = arrProductos.find( p => p.id === id );

        return productoBuscado;
    }

    deleteAll = async() => {
        try{
            return await fs.promises.writeFile(this.ruta,JSON.stringify([],null,2));
        }catch(error){
            return "error";
        }
    }

    deleteById = async(id) => {
        let arrProductos = await this.getAll();
        arrProductos = arrProductos.filter((producto) => producto.id !== id)
        try{
            return await fs.promises.writeFile(this.ruta,JSON.stringify(arrProductos,null,2));
        }catch(error){
            return "error";
        }
    }

}


const db = new Contenedor();

const test = async () => {
    console.log(await db.getAll());
    console.log(await db.save({
        title: "Pepsi",
        price: 200,
        thumbnail: "www.test.com"
    }))
    console.log(await db.save({
        title: "Coca-Cola",
        price: 400,
        thumbnail: "www.test.com"
    }))
    console.log(await db.save({
        title: "Pepsi",
        price: 400,
        thumbnail: "www.test.com"
    }))
    console.log(await db.getById(1));
    console.log(await db.deleteAll());
    console.log(await db.save({
        title: "Pepsi",
        price: 200,
        thumbnail: "www.test.com"
    }))
    console.log(await db.save({
        title: "Coca-Cola",
        price: 400,
        thumbnail: "www.test.com"
    }))
    console.log(await db.save({
        title: "Pepsi",
        price: 400,
        thumbnail: "www.test.com"
    }))
    console.log(await db.save({
        title: "Nuka-Cola",
        price: 700,
        thumbnail: "www.test.com"
    }))
    console.log(await db.deleteById(4));
}

test();
