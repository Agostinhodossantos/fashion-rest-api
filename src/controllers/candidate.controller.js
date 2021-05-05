const { setCandidate, getCandidateById, getCandidates, 
        updateCandidate, deleteCandidate,getConcourses} = require("./providers")
const {Candidate} = require("../models/Candidate")
const {getData, isEmpty,  existUid} = require("../utils/utils")
const { v4: uuidv4 } = require('uuid')

const getAllCandidate = async(req, res) => {
    let uid = req.params.id
    if(uid != undefined && uid != null) {
        var candidates = await getCandidates(uid)
        res.status(200).send(candidates)
    } else {
        res.status(400).send({status: 400 ,message: "Request missing a required parameter ID"})
    }
}

const deleteCurrentCandidate = async(req, res) => {
    let uidConcourse = req.params.uid_concourse
    let uidCandidate = req.params.uid_candidate
    let errArray = []

    if(isEmpty(uidConcourse)) {
        errArray.push("uidConcourse")

    } else if(isEmpty(uidCandidate)) {
        if (errArray.length > 0) { errArray.push(", uidConcourse")} 
        else {errArray.push("uidConcourse")}

    } else {

        let response = await deleteCandidate(uidConcourse, uidCandidate)
        res.status(response.status).send(response)
    }
      
    
    if(errArray.length > 0) {
        res.status(422).send({status: 422, message: `Request missing a required parameter ${errArray}` })
    }

}

const updateCurrentCandidate = async(req, res) => {
    let uidConcourse = req.params.uid_concourse
    let uidCandidate = req.params.uid_candidate
    let data = req.body

    let errArray = []
    if(isEmpty(uidConcourse)) {
        errArray.push("uidConcourse")

    } else if(isEmpty(uidCandidate)) {
        if(errArray.length > 0) {
            errArray.push(", uidConcourse")
        } else {
            errArray.push("uidConcourse")
        }
        
    } else {
        
        if(data != undefined) {
            let response = await updateCandidate(uidConcourse, uidCandidate, data)
            res.send(response.status).send(response)
        } else {
            res.status(422).send({status: 422, message: `Request missing a required parameter body` })
        }

    }

    if(errArray.length > 0) {
        res.status(422).send({status: 422, message: `Request missing a required parameter ${errArray}` })
    }

}

const getCurrentCandidate = async(req, res) => {
    let uidConcourse = req.params.uid_concourse
    let uidCandidate = req.params.uid_candidate

    let errArray = []
    if(isEmpty(uidConcourse)) {
        errArray.push("uidConcourse")

    } else if(isEmpty(uidCandidate)) {
        if(errArray.length > 0) {
            errArray.push(", uidConcourse")
        } else {
            errArray.push("uidConcourse")
        }
        
    } else {
        let candidate = await getCandidateById(uidConcourse , uidCandidate)
        if(candidate != undefined) {
            res.status(200).send(candidate)
        } else {
            res.status(404).send(null)
        }
    }

    if(errArray.length > 0) {
        res.status(422).send({status: 422, message: `Request missing a required parameter ${errArray}` })
    }


}

const createCandidate = async(req, res) => {
    let candidate = null
    let uidConcourse = req.params.id

    let concourseList = await getConcourses()
    let exist =  existUid(concourseList, uidConcourse.toString())
  
    try {
        candidate =  setupCandidate(req) 
    } catch (error) {
        res.status(422).send({status: 422, message: `error: ${error}`})
    }

    
    if(candidate != null) {
        
        if(uidConcourse != undefined && uidConcourse != null) {
            if(exist == true) {
                var response = await setCandidate(uidConcourse.toString(), JSON.parse(JSON.stringify(candidate)))
                res.status(response.status).send(response)
            } else {
                res.status(404).send({status: 404 ,message: `not found concourse with ID ${uidConcourse}`})
            }
           
        } else {
            res.status(400).send({status: 400 ,message: "Request missing a required parameter ID"})
        }
    }
}

function setupCandidate(req) {
   var uid = req.body.userUid
   var userUid = req.body.userUid
   var eventUid = uuidv4()
   var name = req.body.name
   var photoUrl = req.body.photoUrl 

   var errArray = []
   var errMsg = "must not be empty";

   if (isEmpty(uid)) {
       errArray.push(`uid: ${errMsg}`)

   } else if(isEmpty(name)) {
       errArray.push(`name: ${errMsg}`)

   } else {

    let candidate = new Candidate(uid, userUid, eventUid, name, photoUrl)
    return candidate
   }

   if(errArray.length > 0) {
       throw errMsg.toString()
   }
}



module.exports = {
    getAllCandidate,
    deleteCurrentCandidate,
    getCurrentCandidate,
    createCandidate,
    updateCurrentCandidate
}