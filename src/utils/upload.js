const multer = require("multer")
const {defaultBucket} = require("./config")
const { v4: uuidv4 } = require('uuid');


const storageMulter = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname);
    }
});
  
const upload = multer({ storage: storageMulter });


async function serverFileUpload(filepath , filename, destination, file) {
    var bucket = defaultBucket
    var token = uuidv4();
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: token  //reate a download token.
      },
      contentType: file.mimetype,
      cacheControl: 'public, max-age=31536000',
    };

    var fileUrl = "";
    await bucket.upload(filepath, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: metadata,
      destination: destination+"/"+filename
    }).then((res)=>{

        var fileName = res[0].name.replace("/" , "%2F");
        fileUrl = "https://firebasestorage.googleapis.com/v0/b/fashion-2de23.appspot.com/o/"+fileName+"?alt=media&token="+token;
    
    }).catch((err)=>{
        return null;
    })
 
    return fileUrl;
}


module.exports = {
    upload,
    serverFileUpload
}
