class User {
    constructor(uid, name, profileUrl, location, gender, state, createdAt){
        this.uid = uid
        this.name = name
        this.profileUrl = profileUrl
        this.location = location
        this.gender = gender
        this.state = state
        this.createdAt = createdAt
    }
}

module.exports = User