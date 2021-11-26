const fs = require("fs");
const uuid = require("uuid");
const knex = require("knex");


class Contenedor {
    constructor(opciones,table){
        this.id = uuid.v4();
        this.knexModel = knex(opciones);
        this.table = table;
    }

    async getAll() {
        try{
            this.knexModel.from(this.table).select("*")
                .then((rows) => {
                    let contenido = [];
                    if(rows){
                        for(let row of rows){
                            contenido.push(row);
                        }
                        return contenido;
                    }
                    return contenido;
                })
                .catch((err) => {
                    console.log(err);
                    throw err
                })
        }catch(error){
            console.log(error);
        }
    }

    async save(product) {
        product.id = this.id;
        this.knexModel(this.table).insert(product,"id")
            .then((result) => result.id)
            .catch((err) => {
                console.log(err)
                throw err
            })
    }

    async getById(id) {

        this.knexModel.from(this.table).select("*").where({
            id
        })
            .then((result) => {
                return result
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
    }

    async updateById(id,data){
        this.knexModel(this.table).where({id}).update(data)
            .then(() => console.log("Item updated"))
            .catch((err) => console.log(err))
    }


    async deleteById(id){
        this.knexModel.from(this.table).where({id}).del()
    }

}

module.exports = Contenedor;