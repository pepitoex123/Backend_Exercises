const Contenedor = require("./Contenedor");
const express = require("express");

const db = new Contenedor("productos.txt");

const app = express();


app.use(express.json());


app.get("/productos",async(req,res) => {
    const arrProductos = await db.getAll();
    res.status(200).json({
        success: true,
        data: arrProductos
    })
})

app.get("/producto-random", async(req,res) => {
    const arrProductos = await db.getAll();
    const productoRandom = arrProductos[Math.floor(Math.random() * ( (arrProductos.length - 1) - 0 + 1)) + 0];
    res.status(200).json({
        success: true,
        data: productoRandom
    })
})





