import { sendMail } from './emailService.ts';

export const autoReply = async (replyTo: string, caseID: string) => {
    try {
        await sendMail({
            to: replyTo,
            subject: `AUTOREPLY - ${caseID}`,
            text: 'Thank you for reaching out to us! We will reply shortly.',
            template: 'contactEmail',
            templateVars: {
                'CURRENT_YEAR': `${new Date().getFullYear()}`,
                'CASE_ID': caseID,
            },
        });
    } catch (err) {
        throw err;
    }
};