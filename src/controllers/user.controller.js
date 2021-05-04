const {setUser, getUsers, getUserById, updateUser} = require("./providers")
const {User} = require("../models/User")
const {getData, isEmpty} = require("../utils/utils")

const getUser = async(req, res) => {
    let uid = req.params.id
    if(uid != undefined || uid != null) {
        let user = await getUserById(uid.toString())
        res.status(200).send(user)
    } else {
        res.status(400).send({status: 400 ,message: "Request missing a required parameter ID"})
    }
}

const updateUserData = async(req, res) => {
    let uid = req.params.id
    let user = req.body

    if(user != undefined && user != null) {
        if (uid != undefined && uid != null) {
            let response = await updateUser(uid.toString(), user)
            console.log(response)
            // res.status(response.status).send(response)
        } else {
            res.status(400).send({status: 400 ,message: "Request missing a required parameter ID"})
        }
    }

}

const getAllUser = async(req, res) => {
    let users = await getUsers()
    res.status(200).send(users)
}

const createUser = async(req, res) => {
    let user = null
    try {
        user = setupUser(req)   
    } catch (error) {
        res.status(422).send({message: `error: ${error}`})
    }

    if(user != null) {
        let response = await setUser(JSON.parse(JSON.stringify(user)))
        res.status(response.status).send(response)  
    }

}

function setupUser(req) {
    let uid = req.body.uid
    let name = req.body.name
    let email = req.body.email
    let biography = ""
    let phoneNumber = ""
    let profileUrl = "" // TODO upload photo //
    let location = ""
    let gender = ""
    let state = "active"
    let privileges = "user"
    let createdAt = getData()

    var errArray = []
    var errMsg = "must not be empty";

    if (isEmpty(uid)) {
        errArray.push(`uid: ${errMsg}`)

    } else if(isEmpty(name)) {
        errArray.push(`name: ${errMsg}`)

    } else if(isEmpty(email)) {
        errArray.push(`email: ${errMsg}`)

    } else {
        let user = new User(uid, name, email, biography, phoneNumber, profileUrl, location, gender, state, privileges, createdAt)
       
        return user
    }

    if(errArray.length > 0) {
        throw errArray.toString()
    }
 
}

module.exports = {
    createUser, getAllUser, getUser, updateUserData
}