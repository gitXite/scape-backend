import type { NextFunction, Request, Response } from 'express';
import { generateSTL } from '../services/terrainService';
import { sendMail } from '../services/emailService';

export const sendSTL = async (req: Request, res: Response, next: NextFunction) => {
    // maybe get the whole order request here with address and so forth
    // example parameters, probably needs to change, with typing
    const { lat, lng, verticalScale, scale, orderID, name, email } = req.body;
    if (!lat || !lng || !verticalScale || !scale /*|| !orderID || !name || !email*/) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const stlBuffer = await generateSTL({ lat, lng, verticalScale, scale });

        await sendMail({
            to: 'scapebymd@gmail.com',
            subject: `ORDER PLACED # ${orderID}`,
            text: `Name: ${name} Email: ${email}`,
            template: 'stlFileEmail',
            templateVars: {
                'ORDER_ID': orderID,
                'CUSTOMER_NAME': name,
                'CUSTOMER_EMAIL': email,
                'ORDER_DATE': new Date().toLocaleString(),
                'CURRENT_YEAR': `${new Date().getFullYear()}`,
            },
            attachments: [
                {
                    filename: `${orderID}.stl`,
                    content: stlBuffer,
                    contentType: 'application/sla',
                }
            ]
        });
        res.status(200).json({ message: 'STL sent successfully' });
    } catch (err: any) {
        if (err.status === 429) {
            return res.status(429).json({ message: err.message });
        }
        next(err);
    }
};