const router = require('express').Router();
const { postNewUser, deleteUser, getUsers, postNewExercise, getUserLogs } = require('../controllers/userController');

// POST new user
router.post('/users', postNewUser);

// Delete user
router.post('/delete', deleteUser);

// GET users array
router.get('/users', getUsers);

// POST new exercise
router.post('/users/:_id/exercises', postNewExercise);

// GET exercise logs
router.get('/users/:_id/logs', getUserLogs);

module.exports = router;