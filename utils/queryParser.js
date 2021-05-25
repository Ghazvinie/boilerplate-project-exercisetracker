function queryParser(userId, queryTo, queryFrom, queryLimit) {
    const _id = userId.trim();
    const from = queryFrom === undefined ? new Date(0) : new Date(queryFrom).getTime();
    const to = queryTo === undefined ? new Date() : new Date(queryTo).getTime();
    const limit = queryLimit === undefined ? 0 : parseInt(queryLimit);

    return { _id, from, to, limit };
}

module.exports = queryParser;