const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const concourseController = require("../controllers/concourse.controller")
const candidateController = require("../controllers/candidate.controller")
const votesController = require("../controllers/votes.controller")


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

    router.get("/concourse/:uid_concourse/candidate/:uid_candidate", candidateController.getCurrentCandidate)
    router.get("/concourse/:id/candidates", candidateController.getAllCandidate)
    router.post("/concourse/:id/candidate", candidateController.createCandidate)
    router.put("/concourse/:uid_concourse/candidate/:uid_candidate", candidateController.updateCurrentCandidate)
    router.delete("/concourse/:uid_concourse/candidate/:uid_candidate", candidateController.deleteCurrentCandidate)

    router.get("/concourse/:uid_concourse/candidate/:uid_candidate/votes", votesController.getAllVotes)
    router.post("/concourse/:uid_concourse/candidate/:uid_candidate/vote", votesController.createVote)
    router.delete("/concourse/:uid_concourse/candidate/:uid_candidate/vote/:uid_vote", votesController.deleteCurrentVote)

    app.use(router)
}

module.exports = routes