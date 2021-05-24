const UserModel = require('../models/userModel');
const handleErrors = require('../utils/handleErrors');

async function postNewUser (req, res) {
    const username = req.body.username.trim();

    await UserModel.create({ userName: username })
        .then((user) => {
            console.log('New user created');
            res.json({ usernam: user.userName, _id: user._id });
        })
        .catch(error => {
            const errorObject = handleErrors(error);
            res.json(errorObject);
        });
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