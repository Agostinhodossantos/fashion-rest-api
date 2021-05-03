const express = require("express")
const router = express.Router()


const userController = require("../controllers/user.controller")


let routes = (app) => {
    router.get("/", (req, res) => {
        res.send({message: "Hello, my name is fashion api"})
    })

    app.use(router)
}




module.exports = routes