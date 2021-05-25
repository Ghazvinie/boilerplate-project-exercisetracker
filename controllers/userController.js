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
            return res.json({ errorObject, error });
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
        .catch(error => {
            const errorObject = handleErrors(new Error('GET user error'));
            return res.json({ errorObject, error });
        });
}

async function postNewExercise(req, res) {
    const { description, duration, date } = req.body;
    const _id = req.params._id.trim();

    const exercise = {
        description,
        duration: parseInt(duration),
        date: date === undefined ? new Date().toDateString() : new Date(date).toDateString()
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
        .catch(error => {
            const errorObject = handleErrors(new Error('update user error'));
            return res.json({ errorObject, error });
        });
}

async function getUserLogs(req, res) {
    const _id = req.params._id.trim();
    const from = req.query.from === undefined ? new Date(0) : new Date(req.query.from).getTime();
    const to = req.query.to === undefined ? new Date() : new Date(req.query.to).getTime();
    const limit = req.query.limit === undefined ? 0 : parseInt(req.query.limit);

    if (Object.keys(req.query).length === 0) {
        await UserModel.findById(_id)
            .then(document => {
                return res.json({
                    _id: document._id,
                    username: document.userName,
                    log: document.log,
                    count: document.log.length || 0
                });
            })
            .catch(error => {
                const errorObject = handleErrors(new Error('GET user error'));
                return res.json({ errorObject, error });
            });
    } else {
        await UserModel.findById(_id)
            .then(document => {
                const filtered = document.log.filter(exercise => {
                    const exerciseDate = new Date(exercise.date).getTime();
                    return exerciseDate >= from && exerciseDate <= to;
                });
                return res.json({
                    _id: document._id,
                    username: document.userName,
                    log: filtered.slice(0, limit === 0 ? filtered.length : limit),
                    count: document.log.length || 0
                });
            })
            .catch(error => {
                const errorObject = handleErrors(new Error('GET user error'));
                return res.json({ errorObject, error });
            });
    }
}

module.exports = { postNewUser, getUsers, postNewExercise, getUserLogs };

