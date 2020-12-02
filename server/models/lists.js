import mongoose from 'mongoose';
import Tasks, {TaskSchema} from './tasks.js';


export const ListSchema = mongoose.Schema({
    name: String,
    description: String,
    date_created:{ type: Date, default: new Date()},
    tasks: [TaskSchema],
});

const Lists = mongoose.model('List', ListSchema);

export default Lists;