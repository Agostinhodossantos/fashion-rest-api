function getData() {
    return Date.now().toString()
}

function isEmpty(value) {
    if(value == null || value == undefined || value == "") {
        return true
    } else {
        return false
    }
}


module.exports = {
    getData, isEmpty
}