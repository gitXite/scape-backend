import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const orderSchema = new Schema({
    orderID: String,
    // the rest from Vipps
}, {
    timestamps: true,
});

const Order = model('Order', orderSchema);
export default Order;