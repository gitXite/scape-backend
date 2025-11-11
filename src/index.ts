import express from 'express';
import cors from 'cors';
import config from './config/config.ts';
import connectDB from './config/db.ts';

import { router as microserviceRoutes }  from './routes/microservice.ts';


const app = express();

app.use(cors({
    origin: config.frontendUrl,
}));
app.use(express.json());


app.use('/api/stl', microserviceRoutes);


async function startServer() {
    try {
        await connectDB();

        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    } catch (err) {
        console.error("Failed to start the server: ", err);
        process.exit(1);
    }
}

startServer();