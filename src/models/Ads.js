class Ads {
    constructor(uid, photoUrl, type, redirectLink, createdAt) {
        this.uid = uid
        this.photoUrl = photoUrl
        this.type = type
        this.redirectLink = redirectLink
        this.createdAt = createdAt
    }
}


module.exports = { 
    Ads
}