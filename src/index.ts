import express from 'express';
import cors from 'cors';
import config from './config/config.ts';
import connectDB from './config/db.ts';

import { router as microserviceRoutes }  from './routes/microservice.ts';
import { router as contactRoutes } from './routes/contact.ts';
import { router as reviewRoutes } from './routes/reviews.ts';
import { router as orderRoutes } from './routes/orders.ts';
import { loggerMiddleware } from './middleware/loggerMiddleware.ts';
import { errorHandler } from './middleware/errorHandler.ts';


const app = express();

app.use(cors({
    origin: config.frontendUrl,
}));
app.use(express.json());
app.use(loggerMiddleware);


app.use('/api/stl', microserviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/order', orderRoutes);

app.use(errorHandler);

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
