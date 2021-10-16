const fs = require("fs");


class Contenedor {
    constructor(nombreArchivo){
        this.ruta = nombreArchivo;
        this.id = 1;
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

    async getById(id) {
        const arrProductos = await this.getAll();

        const productoBuscado = arrProductos.find( p => p.id === id );

        return productoBuscado;
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



