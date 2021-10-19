const mongoose = require('mongoose');
const UserModel = require('../models/userModel');
const handleErrors = require('../utils/handleErrors');
const { queryParser, idOrUser } = require('../utils/parserUtility');


// Create new user
function postNewUser(req, res) {
    const username = req.body.username.trim();

    UserModel.create({ userName: username })
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
function getUsers(req, res) {

    UserModel.find()
        .then(collection => {
            // Create array of all user objects
            const userArray = collection.reduce((acc, curr) => {
                acc.push({ username: curr.userName, _id: curr._id });
                return acc;
            }, []);
            return res.status(200).json(userArray);
        })
        .catch(error => {
            const errorObject = handleErrors(new Error('GET user error'));
            return res.status(400).json({ errorObject, error });
        });
}

// Add a new exercise
function postNewExercise(req, res) {
    const { description, duration, date } = req.body;
    const user = idOrUser(req.params._id);

    // Define exercise 
    const exercise = {
        description,
        duration: parseInt(duration),
        date: date === undefined ? new Date().toDateString() : new Date(date).toDateString()
    };

    UserModel.findOneAndUpdate(user, { $push: { log: exercise } }, { new: true, useFindAndModify: false })
        .then(document => {
            const userObject = {
                username: document.userName,
                description: exercise.description,
                duration: exercise.duration,
                _id: document._id,
                date: exercise.date,
            };
            return res.status(201).json(userObject);
        })
        .catch(error => {
            const errorObject = handleErrors(new Error('update user error'));
            return res.status(404).json({ errorObject, error });
        });
}

// Get specific user's logs
function getUserLogs(req, res) {
    const { from, to, limit } = queryParser(req.query.from, req.query.to, req.query.limit);
    const user = idOrUser(req.params._id);

    // If no query parameters provided
    if (Object.keys(req.query).length === 0) {
        UserModel.findOne(user)
            .then(document => {
                const userObject = {
                    _id: document._id,
                    username: document.userName,
                    log: document.log,
                    count: document.log.length || 0
                };
                return res.status(200).json(userObject);
            })
            .catch(error => {
                const errorObject = handleErrors(new Error('GET user error'));
                return res.status(400).json({ errorObject, error });
            });
    } else {
        UserModel.findOne(user)
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
                return res.status(200).json(userObject);
            })
            .catch(error => {
                const errorObject = handleErrors(new Error('GET user error'));
                return res.status(400).json({ errorObject, error });
            });
    }
}


// Delete user from database
async function deleteUser(req, res) {
    const user = idOrUser(req.body.username);
    try {
        // Delete user and return deleted user
        const deleted = await UserModel.deleteOne(user);
        if (deleted.deletedCount > 0) {
            res.status(200).json({ deleted: user });
        } else {
            res.status(400).json({ user: 'Invalid user' });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { postNewUser, getUsers, postNewExercise, getUserLogs, deleteUser };