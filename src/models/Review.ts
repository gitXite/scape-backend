import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
        orderID: String,
        rating: Number,
        message: String,
        validated: Boolean,
    }, {
        timestamps: true,
    }
);

const Reviews = model('Reviews', reviewSchema);
export default Reviews;
