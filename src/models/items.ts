import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemsSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['frame', 'passepartout'],
    },
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    available: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

const Items = model('Items', itemsSchema);
export default Items;