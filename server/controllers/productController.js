const { upload } = require("../utils/upload")
const Product = require("./../models/Product")

exports.addProduct = async (req, res) => {
    try {
        upload(req, res, async err => {
            if (err) {
                console.log(err)
                return res.status(400).json({ message: "Multer Error" + err, })
            }
            console.log(req.files)
            let imageURL = []
            for (let i = 0; i < req.files.length; i++) {
                const src = `${process.env.HOST}/products/${req.files[i].filename}`
                imageURL.push(src)
            }
            const result = await Product.create({
                name: req.body.name,
                stock: req.body.stock,
                price: req.body.price,
                desc: req.body.desc,
                images: imageURL,
            })
            res.json({ message: "Prodcut Add Sucess" })
        })
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
        const result = await Product.deleteMany()
        res.json({ message: " Products Destroy Sucess" })
    } catch (error) {
        console.log("productController => destroyProducts")
        console.log(error)
        res.status(400).json({ message: `Error ${error}` })
    }
}