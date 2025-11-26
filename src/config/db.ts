import mongoose from 'mongoose';
import config from '../config/config.js';


async function connectDB() {
    const uri = config.mongoDBUri;

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Atlas with mongoose');
    } catch (err) {
        console.error("Error connecting to MongoDB: ", err);
        throw err;
    }
}

export default connectDB;