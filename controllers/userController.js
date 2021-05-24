function postNewUser(req, res) {
    res.send('postNewUser');
}

function getUser(req, res) {
    res.send('getUser');
}

function postNewExercise(req, res) {
    res.send('postNewExercise');
}

function getUserLogs(req, res) {
    res.send('getUserLogs');

}

module.exports = { postNewUser, getUser, postNewExercise, getUserLogs };