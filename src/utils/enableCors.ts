import type { VercelResponse } from '@vercel/node';
import config from '../config/config';

export default function enableCors(res: VercelResponse, origin = config.frontendUrl) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
}