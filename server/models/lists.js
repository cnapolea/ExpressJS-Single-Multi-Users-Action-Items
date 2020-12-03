import mongoose from 'mongoose';
import Items, {ItemSchema} from './items.js';


export const ListSchema = mongoose.Schema({
    name: String,
    description: String,
    date_created:{ type: Date, default: new Date()},
    items: [ItemSchema],
});

const Lists = mongoose.model('List', ListSchema);

export default Lists;