"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const emailConfig_1 = __importDefault(require("../config/emailConfig"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
// Setup Multer for file uploads
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, text, html } = req.body;
    const files = req.files; // Multer will populate this array with uploaded files
    if (!to || !subject || (!text && !html)) {
        res.status(400).json({ error: 'Missing required fields: to, subject, text or html' });
        return;
    }
    // Prepare the attachments array if files are uploaded
    const attachments = files === null || files === void 0 ? void 0 : files.map(file => ({
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
        const info = yield emailConfig_1.default.sendMail(mailOptions);
        // Cleanup uploaded files
        if (files) {
            files.forEach(file => fs_1.default.unlinkSync(file.path));
        }
        res.status(200).json({ message: 'Email sent successfully', info });
    }
    catch (error) {
        // Cleanup uploaded files
        if (files) {
            files.forEach(file => fs_1.default.unlinkSync(file.path));
        }
        res.status(500).json({ error: 'Failed to send email', details: error instanceof Error ? error.message : error });
    }
});
exports.sendEmail = sendEmail;
