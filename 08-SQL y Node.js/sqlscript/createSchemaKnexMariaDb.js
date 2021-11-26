const options = require("./../ecommerce/configDbOptionsMariaDb")
const knex = require("knex")(options);


function createSchemaKnexMariaDb(){


    knex.schema.hasTable("productos").then(function(exists){
        if(!exists){
            knex.schema.createTable("productos", table => {
                table.increments("id")
                table.string("title")
                table.integer("price")
                table.string("thumbnail")
            })
                .then(() => console.log("Table created!"))
                .catch((err) => console.log("An error took place: ",err))
                .finally(() => {
                    knex.destroy()
                })
        }
    })


}


module.exports = createSchemaKnexMariaDb