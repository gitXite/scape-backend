import dotenv from 'dotenv';

dotenv.config();

export interface Config {
    port: number;
    nodeEnv: string;
    terrainApiKey: string;
    terrainServiceUrl: string;
    frontendUrl: string;
    mongoDBUri: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    terrainApiKey: process.env.TERRAIN_API_KEY || '',
    terrainServiceUrl: process.env.TERRAIN_SERVICE_URL || '',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    mongoDBUri: process.env.MONGO_DB_URI || '',
};

export default config;