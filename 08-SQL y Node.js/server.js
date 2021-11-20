const express = require("express");
const Contenedor = require("./contenedor");
const handlebars = require("express-handlebars");
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");
const path = require("path");
const optionsMariaDb = require("./ecommerce/configDbOptionsMariaDb");


const productsRouter = require("./routes/productos");

const viewsRouter = require("./routes/publicRendering");





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
    const contenedor = new Contenedor(path.join(__dirname,"data","productos.txt"));
    const contenedorMensajes = new Contenedor(path.join(__dirname,"data","mensajes.txt"))
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
        const contenedor = new Contenedor(path.join(__dirname,"data","productos.txt"));
        const productoAGuardar = JSON.parse(producto);
        await contenedor.save(productoAGuardar);
        const productos = await contenedor.getAll();
        io.sockets.emit("productos",productos);
    })
    socket.on("mensaje", async (mensaje) => {
        const contenedor = new Contenedor(path.join(__dirname,"data","mensajes.txt"));
        const mensajeAGuardar = JSON.parse(mensaje);
        await contenedor.save(mensajeAGuardar);
        const mensajes = await contenedor.getAll();
        io.sockets.emit("mensajes",mensajes);
    })
})

