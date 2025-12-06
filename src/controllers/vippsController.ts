import type { Request, Response, NextFunction } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import config from '../config/config';

export async function createSession(
    req: Request | VercelRequest,
    res: Response | VercelResponse,
    next?: NextFunction
) {
    const body = req.body;
    const response = await fetch(`${config.vippsUrl}/checkout/v3/session`, {
        headers: {
            'Content-Type': 'application/json',
            'client-id': config.vippsClientId,
            'Ocp-Apim-Subscription-Key': config.vippsAPIMKey,
            'Merchant-Serial-Number': config.vippsMSN,
            'Vipps-System-Name': 'Scape by md',
            'Vipps-System-Version': '3.1.2',
        },
        body: JSON.stringify({
            'merchantInfo': {

            },
            'transaction': {

            },
            'reference': '', // unique id
            'paymentDescription': '' // Scape
        }),
    });
}
