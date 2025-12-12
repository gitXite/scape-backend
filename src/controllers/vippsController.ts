import type { Request, Response, NextFunction } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import config from '../config/config';
import {
    generateOrderID,
    createOrder,
    updateOrder,
} from '../services/orderService';

type RequestBody = {
    coordinates: {
        north: number,
        south: number,
        east: number,
        west: number,
    },
    verticalScale: number,
    scale: number,
    frame: string,
    passepartout: string,
};

export async function createSession(
    req: Request | VercelRequest,
    res: Response | VercelResponse,
    next?: NextFunction
) {
    const { coordinates, verticalScale, scale, frame, passepartout } = req.body as RequestBody;

    const orderId = generateOrderID();
    // await createOrder(
    //     orderId,
    //     coordinates,
    //     verticalScale,
    //     scale,
    //     frame,
    //     passepartout
    // );

    const response = await fetch(`${config.vippsUrl}/checkout/v3/session`, {
        headers: {
            'Content-Type': 'application/json',
            'client_id': config.vippsClientId,
            'client_secret': config.vippsClientSecret,
            'Ocp-Apim-Subscription-Key': config.vippsAPIMKey,
            'Merchant-Serial-Number': config.vippsMSN,
            'Vipps-System-Name': 'Scape by md',
            'Vipps-System-Version': '1.0.0',
            'Vipps-System-Plugin-Name': 'custom',
            'Vipps-System-Plugin-Version': '1.0.0',
        },
        method: 'POST',
        body: JSON.stringify({
            'merchantInfo': {
                'callbackUrl': config.vippsCallback, // endpoint for webhook
                'returnUrl': 'https://scapebymd.no/', // website url for showing success or failure
                'callbackAuthorizationToken': config.vippsCallbackToken,
                'termsAndConditionsUrl': 'https://scapebymd.no/terms-of-service',
            },
            'transaction': {
                'amount': {
                    'value': 49700,
                    'currency': 'NOK',
                },
                'paymentDescription': 'Custom Scape', // Scape
            },
            'reference': orderId, // unique id
            'type': 'PAYMENT',
            'logistics': {
                'fixedOptions': [
                    {
                        'brand': 'POSTEN',
                        'amount': {
                            'value': 7900,
                            'currency': 'NOK',
                        },
                        'type': 'MAILBOX',
                        'id': 'NORGESPAKKE',
                        'priority': 0,
                        'isDefault': true,
                        'description': 'Package is delivered to your mailbox',
                    },
                ],
            },
        }),
    });
    const data = await response.json();
    if (!data)
        return res.status(400).json({
            message: 'Something went wrong initializing vipps session',
        });

    res.status(200).json(data);
}

export async function vippsCallback(
    req: Request | VercelRequest,
    res: Response | VercelResponse,
    next?: NextFunction
) {
    if (req.headers.authorization !== `Bearer ${config.vippsCallbackToken}`)
        return res.status(401).end;

    const session = req.body;
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        streetAddress,
        postalCode,
        city,
        shippingMethod,
    } = session.shippingDetails;

    if (session.sessionState === 'PaymentSuccessful') {
        // update order in db
        await updateOrder(
            session.reference,
            firstName,
            lastName,
            email,
            phoneNumber,
            streetAddress,
            postalCode,
            city,
            shippingMethod,
            session.sessionState
        );
    }

    res.status(200).json({ message: 'Order successfully placed' });
}
