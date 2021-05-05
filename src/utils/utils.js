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

function existUid (list, value) {
    let uidList = []
    for(li of list) {
        uidList.push(li.uid)
    }

    if(uidList.includes(value)){
        return true
    } else {
        return false
    }
}


module.exports = {
    getData, isEmpty, existUid
}