const config = require("../utils/config")
const firestore = config.defaultFirestore
const auth = config.defaultAuth
const database = config.defaultDatabase
const bucket = config.defaultBucket
const {uuid} = require("uuidv4") 
const usersRef =  firestore.collection("users")
const concourseRef = firestore.collection("concourses")
const adsRef = firestore.collection("ads")

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

  //CRUD CANDIDATE

 async function setCandidate(uidConcourse, candidate) {
    var response = await concourseRef.doc(uidConcourse).collection("candidates").doc(candidate.uid+"").set(candidate).then(() => {
       return successResponse
    }).catch((error) => {
       return {status: 500, message: `${error}`}
    })
    return response
 }

 async function getCandidates(uidConcourse) {
    var allCandidates = []
     await concourseRef.doc(uidConcourse).collection("candidates").get().then((value) => {
       value.forEach(candidate => {
          allCandidates.push(candidate.data())
       })
    })
    return allCandidates
 }

 async function getCandidateById(uidConcourse, uidCandidate) {
    var candidate = await concourseRef.doc(uidConcourse).collection("candidates").doc(uidCandidate).get().then(value => {
       return value.data()
    })
    return candidate
 }

 async function updateCandidate(uidConcourse, uidCandidate, data) {
    var response = await concourseRef
         .doc(uidConcourse)
         .collection("candidates")
         .doc(uidCandidate)
         .update(data)
         .then(()=> {
            return {status: 200, message: "successfully updated"}
         }).catch((error) => {
            return {status: 500, message: `error: ${error}`}
         })
    return response
 }

 async function deleteCandidate(uidConcourse, uidCandidate) {
   var response = await concourseRef
         .doc(uidConcourse)
         .collection("candidates")
         .doc(uidCandidate)
         .delete()
         .then(() => {
            return {status: 200, message: "Candidates successfully deleted"}
         }).catch((error) => {
            return {status: 500, message: `error: ${error}`}
         })
         return response
 }

 // END CANDIDATE

 //CRUD VOTES

 async function setVote(uidConcourse, uidCandidate, vote) {
    var response = await concourseRef
         .doc(uidConcourse)
         .collection("candidates")
         .doc(uidCandidate)
         .collection("votes")
         .doc(vote.uid+"")
         .set(vote)
         .then(() => {
            return {status: 200, message: "Vote successfully created"}
         }).catch((error) => {
            return {status: 500, message: `error: ${error}`}
         })
         return response
 }

 async function getVotes(uidConcourse, uidCandidate) {
   var allVotes = []
   await concourseRef
         .doc(uidConcourse)
         .collection("candidates")
         .doc(uidCandidate)
         .collection("votes")
         .get()
         .then((value) => {
            console.log(value)
            value.forEach((vote) => {
               allVotes.push(vote.data())
            })
         })

      return allVotes
 }

 async function deleteVote(uidConcourse, uidCandidate, uidVote) {
   var response = await concourseRef
      .doc(uidConcourse)
      .collection("candidates")
      .doc(uidCandidate)
      .collection("votes")
      .doc(uidVote)
      .delete()
      .then(() => {
         return {status: 200, message: "vote successfully deleted"}
      }).catch((error) => {
         return {status: 500, message: `error: ${error}`}
      })

      return response
 }

 // CRUD ADS

 async function setAds(ads) {
    let response = await adsRef.doc(ads.uid+"").set(ads).then(()=> {
       console.log("Success")
       return {status: 200, message: "Ads successfully created"}
    }).catch(error => {
       console.log(error)
       return {status: 500, message: error}
    })

    return response
 }

 async function getAds() {
    let listAds = []
    await adsRef.get().then(() => {
       listAds.forEach((ads) => {
          listAds.push(ads)
       })
    }).catch(error => {
       console.log(error)
    })
    return listAds
 }

 async function getAdsById(uid) {
    let ads = await adsRef
         .doc(uid)
         .get()
         .then(value => {
            return value.data()
         })
   return ads
 }

 async function deleteAds(uid) {
    let response = await adsRef.doc(uid).delete().then(() => {
       return {status: 200, message: "Ads successfully deleted"}
    }).catch((error) => {
       return {status: 500, message: `error: ${error}`}
    })
 }


 module.exports = {
     setUser,
     getUsers,
     getUserById,
     updateUser,
   
     setConcourse,
     getConcourseById,
     getConcourses,
     deleteConcourse,
     updateConcourse,

     setCandidate,
     getCandidateById,
     getCandidates,
     updateCandidate,
     deleteCandidate,

     setVote,
     getVotes,
     deleteVote,

     setAds,
     getAds,
     deleteAds,
     getAdsById
 }