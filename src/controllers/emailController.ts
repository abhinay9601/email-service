import { Request, Response } from 'express';
import transporter from '../config/emailConfig';

export class EmailController {

    public static async sendEmail(req: Request, res: Response): Promise<void> {
        const { to, subject, text, html, files, attachments } = req.body;

        if (!to || !subject || (!text && !html)) {
            res.status(400).json({ error: 'Missing required fields: to, subject, text or html' });
            return;
        }

        const mailOptions = {
            from: `"Your Service" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
            attachments
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email Send Successfully", info);
            res.status(200).json({ message: 'Email sent successfully', info });
        } catch (error) {
            console.error("Failed to send email", error);
            res.status(500).json({ error: 'Failed to send email', details: error instanceof Error ? error.message : error });
        }
    };
}
