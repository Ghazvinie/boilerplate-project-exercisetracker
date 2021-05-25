const UserModel = require('../models/userModel');
const handleErrors = require('../utils/handleErrors');

async function postNewUser(req, res) {
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
                acc.push({ username: curr.userName, _id: curr._id });
                return acc;
            }, []);
            return res.json(userArray);
        })
        .catch(error => console.log(error));
}

async function postNewExercise(req, res) {
    const { description, duration, date } = req.body;
    const _id = req.params._id.trim();
    const exercise = {
        description,
        duration: parseInt(duration),
        date: new Date(date).toDateString() || new Date().toDateString()
    };

    await UserModel.findOneAndUpdate({ _id }, { $push: { log: exercise } }, { new: true, useFindAndModify: false })
        .then(document => {
            return res.json({
                username: document.userName,
                description: exercise.description,
                duration: exercise.duration,
                _id: document._id,
                date: exercise.date,
            });
        })
        .catch(error => console.log(error.message));
}

async function getUserLogs(req, res) {
    const _id = req.params._id.trim();

    await UserModel.findById(_id)
        .then(document => {
            return res.json({
                _id: document._id,
                username: document.userName,
                log: document.log,
                count: document.log.length
            });
        });


}

module.exports = { postNewUser, getUsers, postNewExercise, getUserLogs };

