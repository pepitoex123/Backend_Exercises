const express = require("express");
const Contenedor = require("./contenedor");
const pug = require("pug");



const productsRouter = require("./routes/productos");

const viewsRouter = require("./routes/publicRendering");


const app = express();


app.set("view engine","pug");

app.set("views","./views");


app.use(express.static("public"));


app.use(express.json());

app.use(express.urlencoded());


app.use("/api/productos",productsRouter)

app.use("/",viewsRouter)


app.listen(3000);


