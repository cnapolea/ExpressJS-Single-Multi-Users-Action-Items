const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = {
    schema: taskSchema,
    model: new mongoose.model('Task', taskSchema)
}