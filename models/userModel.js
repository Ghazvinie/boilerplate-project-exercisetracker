const mongoose = require('moogoose');

const UserSchema = new mongoose.Schema({

    userName : {
        type: String,
        required: true,
    },

    exercises : {
        type: Array,
    }
});