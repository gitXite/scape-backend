import dotenv from 'dotenv';

dotenv.config();

export interface Config {
    port: number;
    nodeEnv: string;
    terrainApiKey: string | undefined;
    frontendUrl: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    terrainApiKey: process.env.TERRAIN_API_KEY,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};

export default config;