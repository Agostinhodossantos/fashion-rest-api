class User {
    constructor(uid, name,email,biography,phoneNumber,  profileUrl, location, gender, state, privileges, createdAt){
        this.uid = uid
        this.name = name
        this.email = email
        this.biography = biography
        this.phoneNumber = phoneNumber
        this.profileUrl = profileUrl
        this.location = location
        this.gender = gender
        this.state = state
        this.privileges = privileges
        this.createdAt = createdAt
    }
}


let Privileges = {
    USER: 'user',
    HOST: 'host'
}

module.exports = {
    User, Privileges
}