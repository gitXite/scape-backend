import express from 'express';
import cors from 'cors';
import config from './config/config.ts';


const app = express();

app.use(cors({
    origin: config.frontendUrl,
}));
app.use(express.json());


app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});