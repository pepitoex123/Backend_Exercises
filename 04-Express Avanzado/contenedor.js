const fs = require("fs");
const uuid = require("uuid");


class Contenedor {
    constructor(nombreArchivo){
        this.ruta = nombreArchivo;
        this.id = uuid.v4();
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

    async save(product) {
        const arrProductos = await this.getAll();
        product.id = this.id;
        this.id = this.id + "1";
        arrProductos.push(product);
        try{
            await fs.promises.writeFile(this.ruta,JSON.stringify(arrProductos,null,2))
            return product.id;
        }catch(error){
            return "No se pudo guardar el producto";
        }
    }

    async getById(id) {
        const arrProductos = await this.getAll();

        console.log("El array de productos es ", arrProductos)

        const productoBuscado = arrProductos.find( p => p.id == id );

        console.log("El producto buscado es ", productoBuscado)

        return productoBuscado;
    }

    async updateById(id,data){
        let producto = await this.getById(id);
        console.log("Este es el producto: ",producto)
        console.log("Este es el id", id)
        await this.deleteById(id);
        const arrProductos = await this.getAll();
        producto = {
            ...producto,
            ...data,
            id
        }
        console.log("Este es el producto después de la actualización, ", producto);
        arrProductos.push(producto);
        try{
            await fs.promises.writeFile(this.ruta,JSON.stringify(arrProductos,null,2))
            return producto.id;
        }catch(error){
            return "No se pudo actualizar el producto";
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
            return await fs.promises.writeFile(this.ruta,JSON.stringify(arrProductos,null,2));
        }catch(error){
            return "error";
        }
    }

}

module.exports = Contenedor;