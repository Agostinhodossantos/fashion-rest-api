const { setConcourse, getConcourseById, getConcourses, deleteConcourse, updateConcourse} = require("./providers")
const {Concourse} = require("../models/Concourse")
const {getData, isEmpty} = require("../utils/utils")
const { v4: uuidv4 } = require('uuid')

const getAllConcourses = async(req, res) => {
    let allConcourses = await getConcourses()
    res.status(200).send(allConcourses)    
}

const updateConcourseData = async(req, res) => {
    let uid = req.body.id
    let concourse = req.body

    if (uid != undefined && uid != null) {
        if(concourse != undefined && concourse != null) {
            let response = await updateConcourse(uid, concourse)
            res.status(response.status).send(response)
        } else {
            res.status(422).send({status: 422, message: 'body data must not be empty'})
        }
    } else {
        res.status(400).send({status: 400 ,message: "Request missing a required parameter ID"})
    }
}

const deleteCurrentConcourse = async(req, res) => {
    let uid = req.params.id
    if (uid != undefined && uid != null) { 
        let response = await deleteConcourse(uid)
        res.status(response.status).send(response)
    } else {
        res.status(400).send({status: 400 ,message: "Request missing a required parameter ID"})
    }
  
}

const getConcourse = async(req, res) => {
    let uid = req.params.id
    if (uid != undefined && uid != null) {
        let concourse = await getConcourseById(uid.toString())

        if (concourse != undefined) {
            res.status(200).send(concourse)
        } else {
            res.status(404).send({status: 404, message: `concourse with ${uid} not found`})
        }
    } else {
        res.status(400).send({status: 400 ,message: "Request missing a required parameter ID"})
    }
}

const createConcourse = async(req, res) => {
    let concourse = null
    try {
        concourse = setupConcourse(req)
    } catch (error) {
        res.status(422).send({status: 422, message: `error: ${error}`})
    }

    if(concourse != null) {
        let response = await setConcourse(JSON.parse(JSON.stringify(concourse)))
        res.status(response.status).send(response)
    }
}

function setupConcourse(req) {
    let uid = uuidv4()
    let eventOwnerUid = req.body.eventOwnerUid
    let title = req.body.title 
    let description = req.body.description
    let photoUrl = req.body.photoUrl
    let candidateLimit = req.body.candidateLimit
    let startDateCandidate = req.body.startDateCandidate
    let endDateCandidate = req.body.endDateCandidate
    let type = req.body.type
    let price = req.body.price
    let state = req.body.state
    let createdAt = getData()
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    let otherDetails = ""

    
    var errArray = []
    var errMsg = "must not be empty";


    if (isEmpty(title)) {
        errArray.push(`title ${errMsg}`)
    } else if(isEmpty(eventOwnerUid)) {
        errArray.push(`eventOwnerUid ${errMsg}`)
    } else {
        let concourse = new Concourse(uid, eventOwnerUid, title, description, photoUrl, candidateLimit, startDateCandidate,
                                      endDateCandidate, type, price, state, createdAt, startDate, endDate, otherDetails)
        return concourse
    }

    if(errArray.length > 0) {
        throw errArray.toString()
    }

}



module.exports = {
    createConcourse,
    getAllConcourses,
    getConcourse,
    updateConcourseData,
    deleteCurrentConcourse
}