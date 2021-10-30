const express = require("express");
const Contenedor = require("./contenedor");
const handlebars = require("express-handlebars");



const productsRouter = require("./routes/productos");

const viewsRouter = require("./routes/publicRendering");


const app = express();

app.engine("hbs",handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/"
}))

app.set("view engine","hbs");

app.set("views","./views");


app.use(express.static("public"));


app.use(express.json());

app.use(express.urlencoded());


app.use("/api/productos",productsRouter)

app.use("/",viewsRouter)


app.listen(3000);


