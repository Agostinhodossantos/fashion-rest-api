const {setVote, getVotes,deleteVote} = require("./providers")
const {Vote} = require("../models/Vote")
const {getData, isEmpty} = require("../utils/utils")

const getAllVotes = async(req, res) => {
    let uidConcourse = req.params.uid_concourse
    let uidCandidate = req.params.uid_candidate

    if (uidConcourse != undefined && uidCandidate != undefined) {
        let votes = await getVotes(uidCandidate+"", uidConcourse+"")
        res.status(200).send(votes)
    } else {
        res.status(422).send({status: 422, message: `Request missing a required parameter: uid_concourse or uid_candidate`})
    }

}

const deleteCurrentVote = async(req, res) => {
    let uidConcourse = req.params.uid_concourse
    let uidCandidate = req.params.uid_candidate
    let uidVote = req.params.uid_vote

    

    if (uidConcourse != undefined && uidCandidate != undefined) {
        let response = await deleteVote(uidConcourse+"", uidCandidate+"", uidVote+"")
        if(response != undefined) {
            res.status(response.status).send(response)
        } else {
            res.status(500).send({status: 500, message: "An error ocurred"})
        }
    } else {
        res.status(422).send({status: 422, message: `Request missing a required parameter: uid_concourse or uid_candidate`})
    }

}

const createVote = async(req, res) => {
    let uidConcourse = req.params.uid_concourse
    let uidCandidate = req.params.uid_candidate

    let vote = setupVote(req)
    if (vote != null) {
        if(uidConcourse != undefined && uidCandidate != undefined) {
            let response = await setVote(uidConcourse+"", uidCandidate+"", JSON.parse(JSON.stringify(vote)))
            res.status(response.status).send(response)
        } else {
            res.status(422).send({status: 422, message: `Request missing a required parameter: uid_concourse or uid_candidate`})
        }
    } else {
        res.status(422).send({status: 422, message: `Request missing a required parameter: user uid`})
    }
}

function setupVote(req) {
   let uid = req.body.userVote
   let userVote = req.body.userVote
   let createdAt = getData()

   if(isEmpty(uid)) {
       return null
   } else {
       let vote = new Vote(uid, userVote, createdAt)
       return vote
   }
}

module.exports = {
    getAllVotes,
    createVote,
    deleteCurrentVote
}