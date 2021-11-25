const express = require("express");

const {getAllCartProducts,deleteCart,deleteCartProduct,createCart,createCartProduct,getCart} = require("./../controllers/carrito")


const router = express.Router();


router.route("/").post(createCart)

router.route("/:id").delete(deleteCart).get(getCart)

router.route("/:id/productos").get(getAllCartProducts).post(createCartProduct)

router.route("/:id/productos/:id_prod").delete(deleteCartProduct)



module.exports = router