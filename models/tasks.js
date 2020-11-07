const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    description: String,
    priority: String,
    status: String
});

module.exports = {
    schema: taskSchema,
    model: new mongoose.model('Task', this.schema)
}