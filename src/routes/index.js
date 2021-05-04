const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")


let routes = (app) => {
    router.get("/", (req, res) => {res.send({message: "Hello, my name is fashion api"})})
    router.post("/user", userController.createUser)
    router.get("/users", userController.getAllUser)
    router.get("/user/:id", userController.getUser)
    router.put("/user/:id", userController.updateUserData)

    app.use(router)
}

module.exports = routes