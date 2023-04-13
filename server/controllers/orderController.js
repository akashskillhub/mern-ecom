const Order = require("../models/Order")
const jwt = require("jsonwebtoken")
exports.placeOrder = async (req, res) => {
    try {
        if (!req.cookies) {
            return res.status(401).json({ message: `Inavlid Request` })
        }
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({ message: `Please Provide Token` })
        }
        const { userId } = jwt.verify(token, process.env.JWT_KEY)
        const result = await Order.create({
            userId,
            ...req.body
        })
        res.json({ message: `Order Placce`, result })
    } catch (error) {
        console.log("orderController => placeOrder")
        console.log(error)
        res.status(400).json({ message: `Error ${error}` })
    }
}
exports.allOrders = async (req, res) => {
    try {
        const result = await Order.find()
            .populate("userId", "name email -_id")
            .populate("products.product")
        res.json({ message: `Get All Order Success`, result })
    } catch (error) {
        console.log("orderController => allOrders")
        console.log(error)
        res.status(400).json({ message: `Error ${error}` })
    }
}
exports.ordersHistory = async (req, res) => {
    try {
        if (!req.cookies) {
            return res.status(401).json({ message: `Inavlid Request` })
        }
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({ message: `Please Provide Token` })
        }
        const { userId } = jwt.verify(token, process.env.JWT_KEY)

        const result = await Order.find({ userId })
        res.json({ message: `User Order History Success`, result })
    } catch (error) {
        console.log("orderController => ordersHistory")
        console.log(error)
        res.status(400).json({ message: `Error ${error}` })
    }
}
exports.distroyOrders = async (req, res) => {
    try {
        const result = await Order.deleteMany()
        res.json({ message: `Order Destroy Success`, result })
    } catch (error) {
        console.log("orderController => ordersHistory")
        console.log(error)
        res.status(400).json({ message: `Error ${error}` })
    }
}