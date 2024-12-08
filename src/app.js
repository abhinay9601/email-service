"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const validateApiKey_1 = require("./middleware/validateApiKey");
const emailController_1 = require("./controllers/emailController");
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Configure Multer for file uploads
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.get('/', (req, res) => {
    res.send('Welcome to the Email Service API ❤️');
});
app.post('/api/send-email', validateApiKey_1.validateApiKey, upload.array('attachments', 10), emailController_1.sendEmail);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
