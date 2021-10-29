const express = require("express");
const Contenedor = require("./contenedor");



const productsRouter = require("./routes/productos");


const app = express();


app.use(express.json());


app.use("/api/productos",productsRouter)


app.listen(3000);


