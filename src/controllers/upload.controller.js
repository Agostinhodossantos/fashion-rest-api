const {serverFileUpload} = require("../utils/upload")
const path = require("path");
const { isEmpty } = require("../utils/utils");
const {updateUser} = require("./providers")

const uploadFile = async(req, res) => {
    console.log(req.body)
    console.log(req)
    let file = path.join(__dirname , "../../uploads/"+req.file.filename);
    let destination = "file";
    const url = await serverFileUpload(path.normalize(file) , req.file.filename , destination, req.file);

    if (isEmpty(url)){
        res.status(500).send({status: 500, message: "An error ocured"})
    } else {
        res.status(200).send({status: 200, url: `${url}` })
    }
}

const uploadProfile = async(req, res) => {
    console.log(req.body)
    let uid = req.params.id
    let file = path.join(__dirname , "../../uploads/"+req.file.filename);
    let destination = "profiles";
    let url = ""  

    if(!isEmpty(uid)) {
       url = await serverFileUpload(path.normalize(file) , req.file.filename , destination, req.file);
    }

    if (isEmpty(url)) {
        res.status(500).send({status: 500,message: "an unknown error occurred"})
    } else {
       let data = {profileUrl: url}  
       let response = await updateUser(uid+"", data)

       if (response != undefined) {
           res.status(response.status).send(response)
       } else {
           res.status(500).send({status: 500, message: "an unknown error occurred"})
       }
    }

}


module.exports = {
    uploadFile,
    uploadProfile
}
