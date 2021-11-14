const express = require("express");
const Contenedor = require("./contenedor");
const handlebars = require("express-handlebars");



const productsRouter = require("./routes/productos");

const cartRouter = require("./routes/carrito");

const viewsRouter = require("./routes/publicRendering");


const app = express();

app.engine("hbs",handlebars({
    extname: ".hbs",
    defaultLayout: "loginTable.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/"
}))

app.set("view engine","hbs");

app.set("views","./views");


app.use(express.static("public"));


app.use(express.json());

app.use(express.urlencoded({extended: true}));


app.use("/api/productos",productsRouter)

app.use("/api/carrito",cartRouter)

app.use("/",viewsRouter)

app.use("/*", (req,res,next) => {

    res.status(400).json({
        error: true
    })
    next()
})


// Variable Booleana Administrador

let administrador = false;


app.listen(8080);


