import mongoose from 'mongoose';

export const TaskSchema = mongoose.Schema({
    description: String,
    priority: String,
    status: String,
    date_created:{ type: Date, default: new Date()},
});

const Tasks = new mongoose.model('Task', TaskSchema);

export default Tasks;