const express = require("express");
const { renderFormularioProductos,renderVistaProductos} = require("./../controllers/publicRendering")


const router = express.Router();


router.route("/").get(renderFormularioProductos)
router.route("/productos").get(renderVistaProductos)


module.exports = router;