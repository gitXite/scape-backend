import type { NextFunction, Request, Response } from 'express';
import { generateSTL } from '../services/terrainService';
import { sendMail } from '../services/emailService';
import { uploadToDrive } from '../services/orderService';

interface Order {
    orderId: string;
    status?: string;
    amount?: number;

    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    postalCode: string;
    city: string;
    shippingMethod: string;

    coordinates: {
        north: number;
        south: number;
        east: number;
        west: number;
    };
    verticalScale: number;
    scale: number;
    frame: string;
    passepartout: string;
}

export const sendSTL = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const order = req.body as Order;
    if (
        !order.orderId ||
        !order.coordinates ||
        !order.verticalScale ||
        !order.scale ||
        !order.frame ||
        !order.passepartout ||
        !order.customerFirstName ||
        !order.customerLastName ||
        !order.customerEmail ||
        !order.customerPhone ||
        !order.shippingAddress ||
        !order.postalCode
    ) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const stlBuffer = await generateSTL({ lat: order.coordinates.north, lng: order.coordinates.west, verticalScale: order.verticalScale, scale: order.scale });

        // check if buffersize is close to gmails limit of 25MB including base64 overhead
        // upload to google drive instead
        if (stlBuffer.byteLength > 19 * 1024 * 1024) {
            await uploadToDrive(stlBuffer, order.orderId);
            await sendMail({
                to: 'scapebymd@gmail.com',
                subject: `ORDER PLACED # ${order.orderId}`,
                text: `Name: ${order.customerFirstName} ${order.customerLastName} Email: ${order.customerEmail}`,
                template: 'stlFileEmail',
                templateVars: {
                    ORDER_ID: order.orderId,
                    CUSTOMER_NAME: `${order.customerFirstName} ${order.customerLastName}`,
                    CUSTOMER_PHONE: order.customerPhone,
                    CUSTOMER_EMAIL: order.customerEmail,
                    SHIPPING_ADDRESS: order.shippingAddress,
                    POSTAL_CODE: `${order.postalCode}, ${order.city}`,
                    FRAME: order.frame,
                    PASSEPARTOUT: order.passepartout,
                    ORDER_DATE: new Date().toLocaleString(),
                    CURRENT_YEAR: `${new Date().getFullYear()}`,
                },
            });
        } else {
            await sendMail({
                to: 'scapebymd@gmail.com',
                subject: `ORDER PLACED # ${order.orderId}`,
                text: `Name: ${order.customerFirstName} ${order.customerLastName} Email: ${order.customerEmail}`,
                template: 'stlFileEmail',
                templateVars: {
                    ORDER_ID: order.orderId,
                    CUSTOMER_NAME: `${order.customerFirstName} ${order.customerLastName}`,
                    CUSTOMER_PHONE: order.customerPhone,
                    CUSTOMER_EMAIL: order.customerEmail,
                    SHIPPING_ADDRESS: order.shippingAddress,
                    POSTAL_CODE: `${order.postalCode}, ${order.city}`,
                    FRAME: order.frame,
                    PASSEPARTOUT: order.passepartout,
                    ORDER_DATE: new Date().toLocaleString(),
                    CURRENT_YEAR: `${new Date().getFullYear()}`,
                },
                attachments: [
                    {
                        filename: `${order.orderId}.stl`,
                        content: stlBuffer,
                        contentType: 'application/sla',
                    },
                ],
            });
        }

        res.status(200).end;
    } catch (err: any) {
        if (err.status === 429) {
            return res.status(429).json({ message: err.message });
        }
        next(err);
    }
};
