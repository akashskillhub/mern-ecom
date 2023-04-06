const {
    readUsers,
    readUserProfile,
    register,
    updateUser,
    deleteUser,
    destroyUsers,
    login,
    continueWithGoogle,
    forgetPassword } = require("../controllers/userController")

const router = require("express").Router()

router
    .get("/", readUsers)
    .get("/profile/:userId", readUserProfile)
    .post("/register", register)
    .put("/:userId", updateUser)
    .delete("/destroy", destroyUsers)
    .delete("/:userId", deleteUser)
    .post("/login", login)
    .post("/continue-with-google", continueWithGoogle)
    .post("/forget-password", forgetPassword)


module.exports = router