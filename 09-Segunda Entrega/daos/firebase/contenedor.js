const fs = require("fs");
const uuid = require("uuid");


class Contenedor {
    constructor(nombreArchivo){
        this.ruta = nombreArchivo;
        this.id = uuid.v4();
        this.timestamp = Date.now();
    }

    async getAll() {
        try{
            const contenido = await fs.promises.readFile(this.ruta,"utf-8");
            return JSON.parse(contenido);
        }catch(error){
            await fs.promises.writeFile(this.ruta,JSON.stringify([],null,2));
            const contenido = await fs.promises.readFile(this.ruta,"utf-8");
            return JSON.parse(contenido);
        }
    }

    async lookUpId(id) {
        try{
            let contenido = await fs.promises.readFile(this.ruta,"utf-8");
            let items = JSON.parse(contenido);
            let idFound = items.find((item) => item.id === id);
            return idFound
        }catch(error){
            throw new Error("Something wrong happened!")
        }
    }

    async save(product) {
        const arrProductos = await this.getAll();
        product.id = this.id;
        product.timestamp = this.timestamp;
        this.id = this.id + "1";
        arrProductos.push(product);
        try{
            await fs.promises.writeFile(this.ruta,JSON.stringify(arrProductos,null,2))
            return product.id;
        }catch(error){
            return "The product couldn't be saved";
        }
    }

    async getById(id) {
        const arrProductos = await this.getAll();

        console.log("The products array is: ", arrProductos)

        const productoBuscado = arrProductos.find( p => p.id == id );

        console.log("The looked up product is: ", productoBuscado)

        return productoBuscado;
    }

    async updateById(id,data){
        let producto = await this.getById(id);
        console.log("This is the product: ",producto)
        console.log("This is the id: ", id)
        await this.deleteById(id);
        const arrProductos = await this.getAll();
        producto = {
            ...producto,
            ...data,
            id
        }
        console.log("This is the product after the update, ", producto);
        arrProductos.push(producto);
        try{
            await fs.promises.writeFile(this.ruta,JSON.stringify(arrProductos,null,2))
            return producto.id;
        }catch(error){
            return "The product couldn't be updated";
        }
    }

    async deleteAll(){
        try{
            return await fs.promises.writeFile(this.ruta,JSON.stringify([],null,2));
        }catch(error){
            return "error";
        }
    }

    async deleteById(id){
        let arrProductos = await this.getAll();
        arrProductos = arrProductos.filter((producto) => producto.id !== id)
        try{
            await fs.promises.writeFile(this.ruta,JSON.stringify(arrProductos,null,2));
            return id;
        }catch(error){
            return "error";
        }
    }

}

module.exports = Contenedor;