const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const concourseController = require("../controllers/concourse.controller")
const candidateController = require("../controllers/candidate.controller")
const votesController = require("../controllers/votes.controller")
const adsController = require("../controllers/ads.controller")
const uploadController = require("../controllers/upload.controller")

const {upload} = require("../utils/upload")


let routes = (app) => {
    router.get("/", (req, res) => {res.send({message: "Hello, my name is fashion api"})})
    router.post("/user", userController.createUser)
    router.get("/users", userController.getAllUser)
    router.get("/users/:id", userController.getUser)
    router.put("/users/:id", userController.updateUserData)
    router.post("/users/:id/profile", upload.single('file'), uploadController.uploadProfile)

    router.post("/concourse", concourseController.createConcourse)
    router.get("/concourses", concourseController.getAllConcourses)
    router.get("/concourses/:id", concourseController.getConcourse)
    router.put("/concourses/:id", concourseController.updateConcourseData)
    router.delete("/concourses/:id", concourseController.deleteCurrentConcourse)

    router.get("/concourses/:uid_concourse/candidates/:uid_candidate", candidateController.getCurrentCandidate)
    router.get("/concourses/:id/candidates", candidateController.getAllCandidate)
    router.post("/concourses/:id/candidate", candidateController.createCandidate)
    router.put("/concourses/:uid_concourse/candidates/:uid_candidate", candidateController.updateCurrentCandidate)
    router.delete("/concourses/:uid_concourse/candidates/:uid_candidate", candidateController.deleteCurrentCandidate)

    router.get("/concourses/:uid_concourse/candidates/:uid_candidate/votes", votesController.getAllVotes)
    router.post("/concourses/:uid_concourse/candidates/:uid_candidate/votes", votesController.createVote)
    router.delete("/concourses/:uid_concourse/candidates/:uid_candidate/votes/:uid_vote", votesController.deleteCurrentVote)
    
    router.get("/ads", adsController.getAllAds)
    router.get("/ads/:id", adsController.getCurrentAds)
    router.post("/ads", adsController.createAds)
    router.delete("/ads", adsController.deleteCurrentAds)

    router.post("/file", upload.single('file'), uploadController.uploadFile)

 

    app.use(router)
}

module.exports = routes