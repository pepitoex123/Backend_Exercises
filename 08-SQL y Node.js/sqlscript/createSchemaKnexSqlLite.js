


function createSchemaKnexSqlLite(knex){
    knex.schema.createTable("mensajes", table => {
        table.increments("id")
        table.string("email")
        table.timestamps("message_timestamp");
        table.string("thumbnail")
    })
        .then(() => console.log("Table created!"))
        .catch((err) => console.log("An error took place: ",err))
        .finally(() => {
            knex.destroy()
        })
}


module.exports = createSchemaKnexSqlLite