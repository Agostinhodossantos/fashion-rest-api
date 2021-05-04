const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const concourseController = require("../controllers/concourse.controller")


let routes = (app) => {
    router.get("/", (req, res) => {res.send({message: "Hello, my name is fashion api"})})
    router.post("/user", userController.createUser)
    router.get("/users", userController.getAllUser)
    router.get("/user/:id", userController.getUser)
    router.put("/user/:id", userController.updateUserData)

    router.post("/concourse", concourseController.createConcourse)
    router.get("/concourses", concourseController.getAllConcourses)
    router.get("/concourse/:id", concourseController.getConcourse)
    router.put("/concourse/:id", concourseController.updateConcourseData)
    router.delete("/concourse/:id", concourseController.deleteCurrentConcourse)

    app.use(router)
}

module.exports = routes