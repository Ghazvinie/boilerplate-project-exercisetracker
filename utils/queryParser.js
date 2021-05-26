function queryParser(userId,queryFrom, queryTo, queryLimit) {
    const _id = userId.trim();
    const from = queryFrom === undefined ? new Date(0).getTime() : new Date(queryFrom).getTime();
    const to = queryTo === undefined ? new Date().getTime() : new Date(queryTo).getTime();
    const limit = queryLimit === undefined ? 0 : parseInt(queryLimit);

    return { _id, from, to, limit };
}

module.exports = queryParser;