const express = require("express");
const Contenedor = require("./contenedor");
const handlebars = require("express-handlebars");
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");
const path = require("path");


const mariaDBOptions = require("./ecommerce/configDbOptionsMariaDb");
const sqlite3Options = require("./ecommerce/configDbOptionsSqlLite");


const mariaDB = require("./sqlscript/createSchemaKnexMariaDb");
const sqlite3 = require("./sqlscript/createSchemaKnexSqlLite");


const productsRouter = require("./routes/productos");

const viewsRouter = require("./routes/publicRendering");

// Creating tables

mariaDB()

sqlite3()


const app = express();

app.engine("hbs",handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/public/views/layouts",
    partialsDir: __dirname + "/public/views/partials/"
}))

app.set("view engine","hbs");

app.set("views","./public/views");


app.use(express.static("public"));


app.use(express.json());

app.use(express.urlencoded());


app.use("/api/productos",productsRouter)

app.use("/",viewsRouter)


const httpServer = new HttpServer(app)

const io = new IOServer(httpServer)


httpServer.listen(3000,() => console.log(`Server on port 3000...`))

io.on("connection",async(socket) => {
    console.log("Usuario Conectado");
    const contenedor = new Contenedor(mariaDBOptions,"productos");
    const contenedorMensajes = new Contenedor(sqlite3Options,"mensajes");
    const productos = await contenedor.getAll();
    const mensajes = await contenedorMensajes.getAll();
    socket.emit("mi mensaje","Este es mi mensaje desde el servidor")
    socket.emit("productos",productos)
    socket.emit("mensajes",mensajes)
    socket.on("notificacion",data => {
        console.log(data);
    })
    socket.on("producto", async (producto) => {
        // io.sockets.emit
        const contenedor = new Contenedor(mariaDBOptions,"productos");
        await contenedor.save(producto);
        const productos = await contenedor.getAll();
        io.sockets.emit("productos",productos);
    })
    socket.on("mensaje", async (mensaje) => {
        const contenedor = new Contenedor(sqlite3Options,"mensajes");
        await contenedor.save(mensaje);
        const mensajes = await contenedor.getAll();
        io.sockets.emit("mensajes",mensajes);
    })
})

