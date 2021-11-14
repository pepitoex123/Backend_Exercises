const express = require("express");

const {getAllCartProducts,deleteCart,deleteCartProduct,createCart,createCartProduct} = require("./../controllers/carrito")


const router = express.Router();


router.route("/").post(createCart)

router.route("/:id").delete(deleteCart)

router.route("/:id/productos").get(getAllCartProducts).post(createCartProduct)

router.route("/:id/:id_prod").delete(deleteCartProduct)



module.exports = router