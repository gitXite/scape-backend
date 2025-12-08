import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const orderSchema = new Schema({
    orderID: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        default: "PENDING",
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentReference: { type: String },

    customerName: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: String },
    shippingAddress: { type: String },

    coordinates: {
        north: { type: Number, required: true },
        south: { type: Number, required: true },
        east: { type: Number, required: true },
        west: { type: Number, required: true },
    },
    scale: {
        type: Number,
        required: true,
    },
    verticalScale: {
        type: Number,
        required: true,
    },
    frame: {
        type: String,
        required: true,
    },
    passepartout: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Order = model('Order', orderSchema);
export default Order;