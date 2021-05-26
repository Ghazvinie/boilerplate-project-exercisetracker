const mongoose = require('mongoose');
const UserModel = require('../models/userModel');
const handleErrors = require('../utils/handleErrors');
const { queryParser, idOrUser } = require('../utils/parserUtility');


// Create new user
async function postNewUser(req, res) {
    const username = req.body.username.trim();

    await UserModel.create({ userName: username })
        .then((user) => {
            const userObject = { username: user.userName, _id: user._id };
            return res.json(userObject);
        })
        .catch(error => {
            const errorObject = handleErrors(error);
            return res.json({ errorObject, error });
        });
}

// Get all users
async function getUsers(req, res) {

    await UserModel.find()
        .then(collection => {
            // Create array of all user objects
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

// Add a new exercise
async function postNewExercise(req, res) {
    const { description, duration, date } = req.body;
    const user = idOrUser(req.params._id);

    // Define exercise 
    const exercise = {
        description,
        duration: parseInt(duration),
        date: date === undefined ? new Date().toDateString() : new Date(date).toDateString()
    };

    await UserModel.findOneAndUpdate(user, { $push: { log: exercise } }, { new: true, useFindAndModify: false })
        .then(document => {
            const userObject = {
                username: document.userName,
                description: exercise.description,
                duration: exercise.duration,
                _id: document._id,
                date: exercise.date,
            };
            return res.json(userObject);
        })
        .catch(error => {
            const errorObject = handleErrors(new Error('update user error'));
            return res.json({ errorObject, error });
        });
}

// Get specific user's logs
async function getUserLogs(req, res) {
    const { from, to, limit } = queryParser(req.query.from, req.query.to, req.query.limit);
    const user = idOrUser(req.params._id);

    // If no query parameters provided
    if (Object.keys(req.query).length === 0) {
        await UserModel.findOne(user)
            .then(document => {
                const userObject = {
                    _id: document._id,
                    username: document.userName,
                    log: document.log,
                    count: document.log.length || 0
                };
                return res.json(userObject);
            })
            .catch(error => {
                const errorObject = handleErrors(new Error('GET user error'));
                return res.json({ errorObject, error });
            });
    } else {
        await UserModel.findOne(user)
            .then(document => {
                // Filter logs between dates
                const filtered = document.log.filter(exercise => {
                    const exerciseDate = new Date(exercise.date).getTime();
                    return exerciseDate >= from && exerciseDate <= to;
                });
                const userObject = {
                    _id: document._id,
                    username: document.userName,
                    log: filtered.slice(0, limit === 0 ? filtered.length : limit),
                    count: document.log.length || 0
                };
                return res.json(userObject);
            })
            .catch(error => {
                const errorObject = handleErrors(new Error('GET user error'));
                return res.json({ errorObject, error });
            });
    }
}

module.exports = { postNewUser, getUsers, postNewExercise, getUserLogs };