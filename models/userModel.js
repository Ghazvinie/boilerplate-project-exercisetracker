const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    userName : {
        type: String,
        required: true,
        unique: [true, 'User already exists']
    },

    exercises : {
        type: Array,
    }
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;