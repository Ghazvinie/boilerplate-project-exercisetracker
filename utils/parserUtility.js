const mongoose = require('mongoose');

function queryParser(queryFrom, queryTo, queryLimit) {
    // If values are empty, set a value
    const from = queryFrom === undefined || queryFrom === '' ? new Date(0).getTime() : new Date(queryFrom).getTime();
    const to = queryTo === undefined || queryTo === '' ? new Date().getTime() : new Date(queryTo).getTime();
    const limit = queryLimit === undefined || queryLimit === '' ? 0 : parseInt(queryLimit);

    return { from, to, limit };
}

function idOrUser(idOrUsername) {
    let user = idOrUsername.trim();
    user = { userName: idOrUsername };
    // Check if is valid _id (else is userName)
    if (mongoose.Types.ObjectId.isValid(idOrUsername)) {
        user = { _id: idOrUsername };
    }
    return user;
}

module.exports = { queryParser, idOrUser };