const {getConcourses, getCandidates} = require("./providers")

async function getHigh() {
    let concourses = await getConcourses()

    for(concourse of  concourses) {
       let topCandidates = await  getHighCandidates(concourse, concourses.length())
    }
}

async function getHighCandidates(concourse, length) {
   
    if (length > 5) {

    } else {

    }
}

async function getHigthCandidates(uid_concourse) {
    let candidates = await getCandidates(uid_concourse)

    for(candidate of candidates) {
        
    }
}