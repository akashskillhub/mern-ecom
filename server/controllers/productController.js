const Product = require("./../models/Product")

exports.addProduct = async (req, res) => {
    try {
        // const result = await Product.create(req.body)
        res.json({ message: "Prodcut Add Sucess" })
    } catch (error) {
        console.log("productController => addProduct")
        console.log(error)
        res.status(400).json({ message: `Error ${error}` })
    }
}
exports.readProducts = async (req, res) => {
    try {
        const result = await Product.find()
        res.json({ message: "Prodcut Read Sucess", result })
    } catch (error) {
        console.log("productController => readProduct")
        console.log(error)
        res.status(400).json({ message: `Error ${error}` })
    }
}
exports.readProductDetail = async (req, res) => {
    try {
        // const result = await Product.find()
        res.json({ message: "Single Prodcut Read Sucess" })
    } catch (error) {
        console.log("productController => readProductDetail")
        console.log(error)
        res.status(400).json({ message: `Error ${error}` })
    }
}
exports.updateProduct = async (req, res) => {
    try {
        // const result = await Product.find()
        res.json({ message: " Product Update Sucess" })
    } catch (error) {
        console.log("productController => updateProduct")
        console.log(error)
        res.status(400).json({ message: `Error ${error}` })
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        // const result = await Product.find()
        res.json({ message: " Product Delete Sucess" })
    } catch (error) {
        console.log("productController => deleteProduct")
        console.log(error)
        res.status(400).json({ message: `Error ${error}` })
    }
}
exports.destroyProducts = async (req, res) => {
    try {
        // const result = await Product.find()
        res.json({ message: " Products Destroy Sucess" })
    } catch (error) {
        console.log("productController => destroyProducts")
        console.log(error)
        res.status(400).json({ message: `Error ${error}` })
    }
}