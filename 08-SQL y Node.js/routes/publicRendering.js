const express = require("express");
const { renderLoginTableProductos,renderVistaProductos} = require("./../controllers/publicRendering")


const router = express.Router();


router.route("/").get(renderLoginTableProductos)


module.exports = router;