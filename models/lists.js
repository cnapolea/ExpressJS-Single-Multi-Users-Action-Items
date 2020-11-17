const mongoose = require('mongoose');
const tasks = require("./tasks.js");

const listSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    date_created: Date,
    tasks: {
        type: [tasks.schema],
        unique: true
    },
});

module.exports = {
    schema: listSchema,
    model: new mongoose.model('List', listSchema)
}