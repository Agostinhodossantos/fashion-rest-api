const config = require("../utils/config")
const firestore = config.defaultFirestore
const auth = config.defaultAuth
const database = config.defaultDatabase
const bucket = config.defaultBucket
const {uuid} = require("uuidv4") 
const usersRef =  firestore.collection("users")
const concourseRef = firestore.collection("concourses")

const successResponse = {status: 200, message: "created successfully"}
const errorResponse = {status: 500, message: "An error has occurred"}

// CRUD USER
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
    var user = await usersRef.doc(uid).get().then((value) => {
       return value.data()
    })
    return user
 }
 
 // END CRUD USER

 // CRUD CONCOURSE
 async function setConcourse(concourse) {
    var res = await concourseRef.doc(concourse.uid).set(concourse).then(() => {
       return successResponse
    }).catch(error => {
       return {status: 200, message: `error: ${error}`}
    })
    return res
 } 

 async function getConcourses(){
   var allConcourses = []
      await concourseRef.get().then((value) => {
         value.forEach(concourse => {
            allConcourses.push(concourse.data())
         })
      })
    return allConcourses 
 }

 async function getConcourseById(uid) {
   var concourse = await concourseRef.doc(uid).get().then((value) => {
      return value.data()
   })

   console.log(concourse)
   return concourse
 }

 async function deleteConcourse(uid) {
    var response = await concourseRef.doc(uid).delete(() => {
       return {status: 200, message: "concourse successfully deleted"}
    }).catch(error => {
       return {status: 500, message: `error: ${error}`}
    })
    return response
 }

 async function updateConcourse(uid, concourse) {
    var response = await concourseRef.doc(uid).update(concourse).then(() => {
       return {status: 200, message: "concourse successfully updated"}
    }).catch(error => {
       return {status: 500, message: `error: ${error}`}
    }) 
    return response
 }
  //END CRUD CONCOURSE

 module.exports = {
     setUser,
     getUsers,
     getUserById,
     updateUser,
     setConcourse,
     getConcourseById,
     getConcourses,
     deleteConcourse,
     updateConcourse
 }