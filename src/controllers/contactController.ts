import type { Request, Response } from 'express';
import { sendMail } from '../services/emailService.ts';

export const sendContactEmail = async (req: Request, res: Response) => {
    const { name, email, orderID, content, honey } = req.body;
    if (!name || !email || !content) {
        return res.status(400).json({ message: 'Required fields must be filled out' });
    }
    if (honey) {
        return res.status(403).json({ message: 'Bot detected' });
    }

    try {
        await sendMail({
            from: '',
            to: 'scapebymd@gmail.com',
            replyTo: email,
            subject: `${name} - ${orderID}`,
            text: content,
        });
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to submit form, please try again', error: err });
    }
};
