import mongoose from 'mongoose';

export const ItemSchema = mongoose.Schema({
    description: String,
    priority: String,
    status: String,
    date_created:{ type: Date, default: new Date()},
});

const Items = new mongoose.model('Item', ItemSchema);

export default Items;