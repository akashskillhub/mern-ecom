const { readProducts, readProductDetail, updateProduct, destroyProducts, deleteProduct } = require("../controllers/productController")
const router = require("express").Router()

router
    .get("/", readProducts)
    .get("/:productId", readProductDetail)
    .put("/:productId", updateProduct)
    .delete("/destroy", destroyProducts)
    .delete("/:productId", deleteProduct)


module.exports = router