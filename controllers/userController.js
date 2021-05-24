const UserModel = require('../models/userModel');
const handleErrors = require('../utils/handleErrors');

async function postNewUser (req, res) {
    const username = req.body.username.trim();

    await UserModel.create({ userName: username })
        .then((user) => {
            console.log('New user created');
            return res.json({ username: user.userName, _id: user._id });
        })
        .catch(error => {
            const errorObject = handleErrors(error);
            return res.json(errorObject);
        });
}

async function getUsers(req, res) {

    await UserModel.find()
    .then(collection => {
        const userArray = collection.reduce((acc, curr) => {
            acc.push({username: curr.userName, _id: curr._id});
            return acc;
        },[]);
       return res.json(userArray);
    })
    .catch(error => console.log(error));
}

function postNewExercise(req, res) {
    res.send('postNewExercise');
}

function getUserLogs(req, res) {
    res.send('getUserLogs');

}

module.exports = { postNewUser, getUsers, postNewExercise, getUserLogs };