const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const admin = require("firebase-admin");

const serviceAccount = require("./db/ecommerce-cf50a-firebase-adminsdk-7p2sc-290c5c5ad6.json");





const productsRouter = require("./routes/productos");

const cartRouter = require("./routes/carrito");

const viewsRouter = require("./routes/publicRendering");


const app = express();


try{
    mongoose.connect("mongodb+srv://pepitoex:hola123456@cluster0.xiz6j.mongodb.net/ecommerce_db?retryWrites=true&w=majority", () => {
        console.log("Connection to database was successful")
    })

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

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


}catch(error){
    console.log("There was an error: ", error.message)
}




