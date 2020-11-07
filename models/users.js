const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const list = require('./lists.js')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    lists: [list.schema],
});

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model('User', userSchema);


