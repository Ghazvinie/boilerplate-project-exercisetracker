const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: [true, 'User already exists']
    },

    exercises: [new mongoose.Schema({
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number, 
            required: true
        },
        date: {
            type: String,
        }
    }, { _id: false })
    ]
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;