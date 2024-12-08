"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateApiKey = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateApiKey = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey) {
        res.status(401).json({ error: 'Missing API key' });
        return;
    }
    if (apiKey !== process.env.API_KEY) {
        res.status(403).json({ error: 'Invalid API key' });
        return;
    }
    next();
};
exports.validateApiKey = validateApiKey;
