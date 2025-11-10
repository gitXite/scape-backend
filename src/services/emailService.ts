import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
    replyTo?: string;
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
        from = `${process.env.MAIL_SENDER_NAME || 'SCAPE by md'} <${process.env.MAIL_USERNAME}>`,
    } = mailOptions;

    try {
        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent successfully: ${info.messageId}`);
    } catch (err) {
        if (err instanceof Error) {
            console.error(`Failed to send email: ${err.message}`);
        } else {
            console.error(`Unknown email error: ${err}`);
        }
    }
}