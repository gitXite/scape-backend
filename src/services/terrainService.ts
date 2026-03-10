import type { STLParams } from '../types/index';
import config from '../config/config';
import { ApiError } from '../utils/apiError';

export const generateSTL = async (params: STLParams): Promise<Buffer> => {
    const { nwLat, nwLng, seLat, seLng, zScale } = params;

    const response = await fetch(`${config.terrainServiceUrl}/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': config.terrainApiKey,
        },
        body: JSON.stringify({
            nwLat,
            nwLng,
            seLat,
            seLng,
            zScale,
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new ApiError(text, response.status);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer;
};
