const options = require("./../ecommerce/configDbOptionsSqlLite");
const knex = require("knex")(options)


function createSchemaKnexSqlLite(){

    knex.schema.hasTable('mensajes').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable("mensajes", table => {
                table.increments("id")
                table.string("email")
                table.timestamp("message_timestamp").defaultTo(knex.fn.now());
                table.string("thumbnail")
            })
                .then(() => console.log("Table created!"))
                .catch((err) => console.log("An error took place: ",err))
                .finally(() => {
                    knex.destroy()
                })
        }
    });
}


module.exports = createSchemaKnexSqlLite