import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSchema = new Schema({
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

const Item = model('Item', itemSchema);
export default Item;