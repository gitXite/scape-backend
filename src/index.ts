import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/config.ts';


const app = express();

app.use(cors({
    origin: config.frontendUrl,
}));
app.use(express.json());


async function startServer() {
    const uri = config.mongoDBUri;

    try {
        await mongoose.connect(uri);

        console.log('Connected to MongoDB Atlas with mongoose');
        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB: ", err);
    }
}

startServer();