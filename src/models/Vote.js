class Vote {
    constructor(uid, userVote, createdAt) {
        this.uid = uid
        this.userVote = userVote
        this.createdAt = createdAt
    }
}

module.exports = {
    Vote
}