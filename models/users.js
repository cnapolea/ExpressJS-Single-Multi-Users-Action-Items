const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const list = require('./lists.js')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email alredy exists.'],
    },
    password: {
        type: String,
    },
    lists: [list.schema],
});

userSchema.plugin(passportLocalMongoose, {
    attemptsField: 3,
});

module.exports = new mongoose.model('User', userSchema);
