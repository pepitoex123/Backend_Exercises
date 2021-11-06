const express = require("express");
const {getAllProducts,getProduct,createProduct,deleteProduct,updateProduct } = require("./../controllers/productos");

const router = express.Router();



router.route("/").get(getAllProducts).post(createProduct)

router.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct)


module.exports = router;