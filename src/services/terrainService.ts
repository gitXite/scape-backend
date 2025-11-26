import type { STLParams } from '../types/index.ts';
import config from '../config/config.js';
import { ApiError } from '../utils/apiError.js';

export const generateSTL = async (params: STLParams): Promise<Buffer> => {
    const { lat, lng, verticalScale, scale } = params;

    const response = await fetch(`${config.terrainServiceUrl}/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': config.terrainApiKey,
        },
        body: JSON.stringify({
            lat,
            lng,
            verticalScale,
            scale,
        }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new ApiError(text, response.status);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer;
};
