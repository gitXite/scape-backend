import mongoose from 'mongoose';
import config from '../config/config.js';

async function connectDB() {
    const uri = config.mongoDBUri;

    let cached = (global as any).mongoose;
    if (!cached) {
        cached = (global as any).mongoose = { conn: null, promise: null };
    }

    if (cached.conn) return cached.conn;
    
    if (!cached.promise) {
        cached.promise = mongoose.connect(uri).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
