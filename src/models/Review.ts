import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const reviewSchema = new Schema({
    orderID: String,
    rating: Number,
    message: String,
});

const Review = model('Review', reviewSchema);
export default Review;