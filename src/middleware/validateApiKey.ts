import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export class Auth{

    public static validateApiKey(req: Request, res: Response, next: NextFunction): void {
        const apiKey = req.header('x-api-key');
        if (!apiKey) {
            console.error("Missing API key");
            res.status(401).json({ error: 'Missing API key' });
            return;
        }
    
        if (apiKey !== process.env.API_KEY) {
            console.error("Invalid API key");
            res.status(403).json({ error: 'Invalid API key' });
            return;
        }
    
        next();
    };
}
