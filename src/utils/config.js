var admin = require("firebase-admin")
var serviceAccount = require("../../config/serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fashion-2de23-default-rtdb.firebaseio.com",
  storageBucket: "fashion-2de23.appspot.com"
})

var defaultAuth = admin.auth()
var defaultDatabase = admin.database()
var defaultFirestore = admin.firestore()
var defaultBucket = admin.storage().bucket()

module.exports = {
    defaultAuth,
    defaultDatabase,
    defaultFirestore,
    defaultBucket
}