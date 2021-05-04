class Concourse {
    constructor(uid, eventOwnerUid, title, description, photoUrl, candidateLimit, startDateCandidate, endDateCandidate, type, price,state, createdAt, startDate, endDate, otherDetails) {
        this.uid = uid
        this.eventOwnerUid = eventOwnerUid
        this.title = title
        this.description = description
        this.photoUrl = photoUrl
        this.candidateLimit = candidateLimit
        this.startDateCandidate = startDateCandidate
        this.endDateCandidate = endDateCandidate
        this.type = type
        this.price = price
        this.state = state
        this.createdAt = createdAt
        this.startDate = startDate
        this.endDate = endDate
        this.otherDetails = otherDetails
    }
}


module.exports = {
    Concourse
}