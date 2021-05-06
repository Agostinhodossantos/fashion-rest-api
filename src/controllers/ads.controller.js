const {setAds, getAds, deleteAds,  getAdsById} = require("./providers")
const {Ads} = require("../models/Ads")
const {getData, isEmpty} = require("../utils/utils")

const createAds = (req, res) => {
    let ads = null
    try {
        ads = setupAds(req)
    } catch (error) {
        res.status(422).send({status: 422, message: `error: ${error}`})
    }

    if(ads != null) {
        let response = setAds(ads)
        if(response != undefined) {
            res.status(response.status).send(response)
        } else {
            res.status(520).send({status: 520, message: `unknown error`})
        }
    }
}

const getAllAds = (req, res) => {
    let adsList = await getAds()
    res.status(200).send(JSON.stringify(adsList))
}

const deleteCurrentAds = (req, res) => {
    let uid = req.params.id
    let response = await deleteAds(uid)
    
    if(response != undefined) {
        res.status(response.status).send(response)
    } else {
        res.status(520).send({status: 520, message: `unknown error`})
    }
}

const getCurrentAds = (req, res) => {
    let uid = req.params.id
    
    if (uid != undefined) {
        let ads = getAdsById(uid)
        res.status(200).send(ads)
    } else {
        res.status(400).send({status: 400 ,message: "Request missing a required parameter ID"})
    }
}

function setupAds(req) {
    let uid = req.body.uid
    let photoUrl = ""
    let adPackages = req.body.adPackages
    let redirectLinkType =  req.body.redirectLink 
    let redirectLink = req.body.redirectLink
    let createdAt = getData()
    let endAt = req.body.endAt


    let errArray = []
    let errMsg = "must not be empty"

    if(isEmpty(uid)) {
        errArray.push(`uid: ${errMsg}`)

    } else {
        let ads = new Ads(uid, photoUrl, adPackages, redirectLinkType, redirectLink, createdAt, endAt)
        return ads
    }

    if(errArray.length > 0) {
        throw errArray.toString()
    }

}


module.exports = {
    createAds,
    getAllAds,
    deleteCurrentAds,
    getCurrentAds
}