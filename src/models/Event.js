class Event {
    constructor(uid, eventOwnerUid, name, description, photoUrl, candidateLimit, type, price,, state, createdAt, startDate, endDate, otherDetails) {
        this.uid = uid
        this.eventOwnerUid = eventOwnerUid
        this.name = name
        this.description = description
        this.photoUrl = photoUrl
        this.candidateLimit = candidateLimit
        this.type = type
        this.price = price
        this.state = state
        this.createdAt = createdAt
        this.startDate = startDate
        this.endDate = endDate
        this.otherDetails = otherDetails
    }
}



module.exports = Event