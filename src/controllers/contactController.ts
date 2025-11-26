import type { Request, Response } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendMail } from '../services/emailService.ts';
import { autoReply } from '../services/contactService.ts';
import { generateCaseID } from '../utils/generateCaseID.ts';

interface ContactBody {
    name: string;
    email: string;
    orderID: string;
    content: string;
    honey: string;
}

export const sendContactEmail = async (req: VercelRequest | Request, res: VercelResponse | Response) => {
    const { name, email, orderID, content, honey } = req.body as ContactBody;
    if (!name || !email || !content) {
        return res.status(400).json({ message: 'Required fields must be filled out' });
    }
    if (honey) {
        return res.status(403).json({ message: 'Bot detected' });
    }

    const caseID = generateCaseID();
    try {
        await sendMail({
            to: 'scapebymd@gmail.com',
            replyTo: email,
            subject: `${name} - ${caseID} - ${orderID || 'null'}`,
            text: content,
        });
        res.status(200).json({ message: 'Email sent successfully' });
        autoReply(email, caseID);
    } catch (err) {
        res.status(500).json({ message: 'Failed to submit form, please try again', error: err });
    }
};
