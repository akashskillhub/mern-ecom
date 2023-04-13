const { placeOrder, allOrders, ordersHistory, distroyOrders } = require("../controllers/orderController")

const router = require("express").Router()

router
    .post("/place", placeOrder)
    .get("/", allOrders)
    .get("/order-history", ordersHistory)
    .delete("/destroy", distroyOrders)

module.exports = router