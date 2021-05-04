class Ads {
    constructor(uid, photoUrl, adPackages, redirectLinkType, redirectLink, createdAt, endAt) {
        this.uid = uid
        this.photoUrl = photoUrl
        this.adPackages = adPackages
        this.redirectLinkType = redirectLinkType
        this.redirectLink = redirectLink
        this.createdAt = createdAt
        this.endAt = endAt
    }
}

let RedirectLinkType = {
    WHATSAPP: "whatsapp",
    FACEBOOK: "facebook",
    WEBSITE: "website",
    TELEFONE: "telefone"
}

let AdPackages = {
    BASIC: "basic",
    STANDARD: "standard",
    PREMIUM: "premium"
}

module.exports = { 
    Ads, RedirectLinkType, AdPackages
}