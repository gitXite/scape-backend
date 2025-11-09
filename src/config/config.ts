import dotenv from 'dotenv';

dotenv.config();

export interface Config {
    port: number;
    nodeEnv: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;