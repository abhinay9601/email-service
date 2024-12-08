import { Request, Response } from 'express';
import transporter from '../config/emailConfig';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Setup Multer for file uploads
const upload = multer({ dest: 'uploads/' });

export const sendEmail = async (req: Request, res: Response): Promise<void> => {
    const { to, subject, text, html } = req.body;

    const files = req.files as Express.Multer.File[]; // Multer will populate this array with uploaded files

    if (!to || !subject || (!text && !html)) {
        res.status(400).json({ error: 'Missing required fields: to, subject, text or html' });
        return;
    }
    // Prepare the attachments array if files are uploaded
    const attachments = files?.map(file => ({
        filename: file.originalname,
        path: file.path,
    }));

    const mailOptions = {
        from: `"Your Service" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html,
        attachments,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        // Cleanup uploaded files
        if (files) {
            files.forEach(file => fs.unlinkSync(file.path));
        }
        res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
        // Cleanup uploaded files
        if (files) {
            files.forEach(file => fs.unlinkSync(file.path));
        }
        res.status(500).json({ error: 'Failed to send email', details: error instanceof Error ? error.message : error });
    }
};
