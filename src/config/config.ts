import dotenv from 'dotenv';

dotenv.config();

export interface Config {
    port: number;
    nodeEnv: string;
    terrainApiKey: string;
    terrainServiceUrl: string;
    frontendUrl: string;
    mongoDBUri: string;
    vippsUrl: string;
    vippsClientId: string;
    vippsClientSecret: string;
    vippsAPIMKey: string;
    vippsMSN: string;
    vippsCallback: string;
    vippsCallbackToken: string;
    backendUrl: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    terrainApiKey: process.env.TERRAIN_API_KEY || '',
    terrainServiceUrl: process.env.TERRAIN_SERVICE_URL || '',
    frontendUrl: process.env.FRONTEND_URL || 'https://impunitive-earline-semipatriotic.ngrok-free.dev',
    mongoDBUri: process.env.MONGO_DB_URI || '',
    vippsUrl: process.env.VIPPS_URL || '',
    vippsClientId: process.env.VIPPS_CLIENT_ID || '',
    vippsClientSecret: process.env.VIPPS_CLIENT_SECRET || '',
    vippsAPIMKey: process.env.VIPPS_APIM_PRIMARY_KEY || '',
    vippsMSN: process.env.VIPPS_MSN || '',
    vippsCallback: process.env.VIPPS_CALLBACK_URL || '',
    vippsCallbackToken: process.env.VIPPS_CALLBACK_TOKEN || '',
    backendUrl: process.env.BACKEND_URL || ''
};

export default config;