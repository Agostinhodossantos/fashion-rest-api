const config = require("../utils/config")
const firestore = config.defaultFirestore
const auth = config.defaultAuth
const database = config.defaultDatabase
const bucket = config.defaultBucket
const {uuid} = require("uuidv4") 
const usersRef =  firestore.collection("users")

const successResponse = {status: 200, message: "created successfully"}
const errorResponse = {status: 500, message: "An error has occurred"}


async function setUser(user) {
    var res = await usersRef.doc(user.uid).set(user).then(() => {
       return successResponse
    }).catch((err) => {
       return  {status:500, message: `error: ${err}`}
    })
    return res
}

async function updateUser(uid, user) {
   var res = await usersRef.doc(uid).update(user).then(()=> {
      return {status: 200, message: "user successfully updated"}
   }).catch((error) => {
      return {status: 500, message: `${error}`}
   })
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
    var user = await usersRef.doc(uid).get().then((value) => {
       return value.data()
    })
    return user
 }
 

 module.exports = {
     setUser,
     getUsers,
     getUserById,
     updateUser
 }