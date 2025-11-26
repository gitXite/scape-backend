import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { loadTemplate } from '../utils/templateLoader.ts'; 

dotenv.config();

interface MailOptions {
    from?: string;
    to: string;
    replyTo?: string;
    subject: string;
    text: string;
    html?: string;
    template?: string; // template file name without.html
    templateVars?: Record<string, string>;
    attachments?: any[],
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

export async function sendMail(mailOptions: MailOptions) {
    const {
        from = mailOptions.from ?? `"SCAPE by md" <${process.env.MAIL_USERNAME}>`,
        html = mailOptions.html ?? (mailOptions.template ? loadTemplate(mailOptions.template, mailOptions.templateVars) : undefined),
    } = mailOptions;

    try {
        const info = await transporter.sendMail({
            ...mailOptions,
            from,
            html,
        });

        console.log(`Email sent successfully: ${info.messageId}`);
    } catch (err) {
        if (err instanceof Error) {
            console.error(`Failed to send email: ${err.message}`);
        } else {
            console.error(`Unknown email error: ${err}`);
        }
    }
}