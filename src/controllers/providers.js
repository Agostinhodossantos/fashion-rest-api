const config = require("../utils/config")
const firestore = config.defaultFirestore
const auth = config.defaultAuth
const database = config.defaultDatabase
const bucket = config.defaultBucket
const {uuid} = require("uuidv4") 
const usersRef =  firestore.collection("users")


async function setUser(user) {
    var res = await usersRef.doc(user.uid).set(JSON.parse(JSON.stringify(user))).then((documentReference)=> {
       return successResponse
    }).catch((err) => {
       return  {status:500, message: err}
    })
    return res
 }
 
 async function getUsers() {
    var allUsers = []
    await usersRef.get().then((value) => {
        value.forEach((user) => {
           allUsers.push(user.data())
        })
     })
    
     return allUsers
 }
 
 async function getUserById(uid) {
    var user =  await usersRef.doc(uid).get().then((value) => {
       return value.data()
    })
    return user
 }
 

 module.exports = {
     setUser,
     getUsers,
     getUserById
 }