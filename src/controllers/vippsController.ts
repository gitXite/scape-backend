import type { Request, Response, NextFunction } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import config from '../config/config';
import {
    generateOrderID,
    createOrder,
    updateOrder,
    deleteOrder,
    checkOrder,
} from '../services/orderService';
import { sendMail } from '../services/emailService';
// import { Order } from '../types';

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
    reference: string | null,
};

export async function createSession(
    req: Request | VercelRequest,
    res: Response | VercelResponse,
    next?: NextFunction
) {
    const { coordinates, verticalScale, scale, frame, passepartout, reference } = req.body as RequestBody;

    const orderId = reference ? reference : generateOrderID();
    await createOrder(
        orderId,
        coordinates,
        verticalScale,
        scale,
        frame,
        passepartout
    );

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
            'Idempotency-Key': orderId,
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
                    'value': 54700,
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
                            'value': 4900,
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

    res.status(200).json({ data, orderId });
}

async function processVippsCallback(session: any) {
    const { order } = await checkOrder(session.reference);
    if (order.status === 'PAID') return;

    if (session.sessionState === 'PaymentSuccessful') {
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
            'PAID'
        );

        const response = await fetch(`${config.backendUrl}/api/order/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderID: session.reference,
                coordinates: order.coordinates,
                verticalScale: order.verticalScale,
                scale: order.scale,
                frame: order.frame,
                passepartout: order.passepartout,
                customerFirstName: firstName,
                customerLastName: lastName,
                customerEmail: email,
                customerPhone: phoneNumber,
                shippingAddress: streetAddress,
                postalCode,
                city
            })
        });
        if (!response.ok) {
            return;
        }

        await sendMail({
            to: email,
            subject: `Order confirmation #${session.reference}`,
            text: 'Order confirmed',
            template: 'orderConfirmationEmail',
            templateVars: {
                'ORDER_ID': session.reference,
                'CUSTOMER_NAME': firstName,
                'CURRENT_YEAR': `${new Date().getFullYear()}`,
            },
        });
    } else if (session.sessionState === 'PaymentTerminated' || session.sessionState === 'SessionExpired') {
        await deleteOrder(session.reference);
    }
}

export async function vippsCallback(
    req: Request | VercelRequest,
    res: Response | VercelResponse,
    next?: NextFunction
) {
    if (req.headers.authorization !== config.vippsCallbackToken) {
        return res.status(401).end();
    }

    const session = req.body;

    try {
        await processVippsCallback(session);
    } catch (err) {
        console.error('Processing Vipps callback failed', err);
    }

    return res.status(200).json({ ok: true });
}

export async function checkCallback(req: Request | VercelRequest, res: Response | VercelResponse) {
    const { reference } = req.query as { reference: string };
    const response = await fetch(`${config.vippsUrl}/checkout/v3/session/${reference}`, {
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
            'Idempotency-Key': reference,
        }
    });
    const session = await response.json();
    const { sessionState } = session;
    // if (sessionState === 'PaymentSuccessful') {
    //    const {
    //        firstName,
    //        lastName,
    //       email,
    //        phoneNumber,
    //        streetAddress,
    //        postalCode,
    //        city,
    //        shippingMethod,
    //    } = session.shippingDetails;

        // send stl mail and confirmation if not duplicate
        // 
    //    console.log('Polling endpoint hit, check for duplicate');
    //    return res.status(200).json({ message: 'Polling endpoint hit, check for duplicate' });
    // } else if (sessionState === 'PaymentTerminated' || sessionState === 'SessionExpired') {
    //    await deleteOrder(reference);
    //    return res.status(408).json({ message: 'Checkout cancelled' });
    // }
    res.status(200).json(sessionState);
}
