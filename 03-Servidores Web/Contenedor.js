const fs = require("fs");

class Contenedor {
    async constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        if (JSON.parse(await this.getAll()).length > 0){
            this.id = (JSON.parse(await this.getAll()).length) + 1
        }else{
            this.id = 1;
        }
    }
    async save(object){
        const arrProducts =  JSON.parse(await this.getAll());
        object = {
            ...object,
            id: this.id
        }
        ++this.id;
        arrProducts.push(object);
        try{
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(arrProducts,null,2))
            return (this.id - 1);
        }catch(error){
            throw new Error("No se pudo guardar");
        }
    }
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.nombreArchivo,"utf-8")
            console.log(data);
            return data;
        }catch(error){
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify([],null,2));
            const data = await fs.promises.readFile(this.nombreArchivo,"utf-8");
            return JSON.parse(data);
        }
    }
    async getById(id){
        const arrProducts = await this.getAll();
        const product = arrProducts.find((product) => product["id"] === id);
        if(product){
            return product;
        }else{
            return null;
        }
    }

    async deleteById(id){
        let arrProducts = await this.getAll();
        arrProducts = arrProducts.filter((product) => product["id"] !== id);
        try{
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(arrProducts,null,2))
            return true;
        }catch(error){
            throw new Error("Hubo un error");
        }
    }

    async deleteAll(){
        try{
            return await fs.promises.writeFile(this.nombreArchivo,JSON.stringify([],null,2))
        }catch(error){
            throw new Error("Hubo un error!");
        }
    }

}



module.exports = Contenedor;
