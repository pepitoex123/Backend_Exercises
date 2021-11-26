



const options = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "backend_exercise"
    },
    pool: {min: 0,max: 7}
}

module.exports = options