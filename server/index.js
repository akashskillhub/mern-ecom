const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const connectDB = require("./config/db")
require("dotenv").config({ path: "./.env" })
connectDB()
const app = express()
app.use(express.json())
app.use(express.static("public"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/products", require("./routes/productRoutes"))

mongoose.connection.once("open", e => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT || 5000, err => {
        err
            ? console.log(`UNABLE TO START ${err}`)
            : console.log(`http://localhost:${process.env.PORT || 5000}`)
    })
})
mongoose.connection.on("error", err => console.log(`MONGO ERROR ${err}`))

