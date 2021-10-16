const Contenedor = require("./Contenedor");

const db = new Contenedor("productos.txt");



db.save({
    title: "Gatorade",
    price: 100,
    thumbnail: "https://www.test.com"
})

db.save({
    title: "Coca-Cola",
    price: 250,
    thumbnail: "https://www.cocacola.com"
})

db.save({
    title: "Pepsi",
    price: 300,
    thumbnail: "https://www.pepsi.com"
})



