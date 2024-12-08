import express, { Application } from 'express';
import dotenv from 'dotenv';
import { validateApiKey } from './middleware/validateApiKey';
import { sendEmail } from './controllers/emailController';
import multer from 'multer';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
    res.send('Welcome to the Email Service API ❤️');
});

app.post('/api/send-email', validateApiKey, upload.array('attachments', 10), sendEmail);


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
