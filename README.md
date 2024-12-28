# Email Service with File Attachments

An Express.js-based email service that allows users to send emails with optional attachments via API calls. It includes request validation with an API key and utilizes TypeScript for enhanced type safety.

Check the project at https://email-service-coral.vercel.app
---

## Features

- Send emails with plain text or HTML content.
- Support for multiple file attachments.
- API key validation for secure access.
- Written in TypeScript for improved development experience.
- Middleware-powered architecture using Multer for file uploads.

---

## Prerequisites

Before running the project, ensure you have:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A valid email provider (e.g., Gmail, Outlook) and credentials.

---

## 1. Clone the Repository

```bash
git clone https://github.com/abhinay9601/email-service.git
cd email-service 
```

## 2.  Install Dependencies

Install the required dependencies using the following command:
```bash
npm install
```
## 3. Configure Environment Variables

Create a .env file in the root directory and add the following variables:
```bash
PORT=3000
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
API_KEY=your-secure-api-key
```
## NOTE:- For API key contact abhinaysingh372@gmail.com

Replace placeholders with actual values:

EMAIL_HOST: SMTP host of your email provider.
EMAIL_PORT: SMTP port (e.g., 587 for TLS).
EMAIL_USER: Email account username.
EMAIL_PASS: Email account password (or app password if using Gmail).
API_KEY: A secure API key to authenticate requests

## Run the Application

## Development Mode

Start the development server with the following command:
```bash
npm run dev
```
## Production Mode
Build the project and run it in production:

```bash
npm run build
npm start
```
## API Documentation
# Send Email

Endpoint: POST /api/send-email

# Headers:

x-api-key: Your secure API key.

# Body Parameters:

to (string): Recipient email address (required).
subject (string): Email subject (required).
text (string): Plain text content (required).
html (string): HTML content (required).
attachments: Array<{ filename: string, content: any }> (optional)

# Example cURL Request:
```bash
curl -X POST https://email-service-coral.vercel.app/api/send-email \
-H "x-api-key: your-secure-api-key" \
-F "to=recipient@example.com" \
-F "subject=Test Email with Attachments" \
-F "text=Hello from Email Service!" \
-F "attachments=@path/to/file1.txt" \
-F "attachments=@path/to/file2.jpg"
```
# Response:

1. 200 OK: Email sent successfully.
```json
{
  "message": "Email sent successfully",
  "info": { ... }
}
```
2. 400 Bad Request: Missing required fields
```json
{
  "error": "Missing required fields: to, subject, text or html"
}
```
3. 401 Unauthorized: Missing API key.
```json
{
  "error": "API key is missing"
}
```
4. 403 Forbidden: Invalid API key.
```json
{
  "error": "Invalid API key"
}
```
5. 500 Internal Server Error: Failed to send email.
```json
{
  "error": "Failed to send email",
  "details": "Error details here"
}
```
---

### Folder Structure
```bash
email-service/
├── src/
│   ├── config/
│   │   └── emailConfig.ts      # Nodemailer configuration
│   ├── controllers/
│   │   └── emailController.ts  # Email logic
│   ├── middlewares/
│   │   └── validateApiKey.ts   # API key validation middleware
│   └── app.ts               # Express app setup
├── uploads/                    # Directory for temporary file storage
├── .env                        # Environment variables
├── package.json
├── tsconfig.json               # TypeScript configuration
├── README.md                   # Project documentation

```
---

## Dependencies
# Core Dependencies
- Express
- TypeScript
- Nodemailer
- Multer
# Dev Tools
- ts-node
- dotenv

---

##Troubleshooting
- Invalid login credentials: Ensure correct email/password in the .env file. If using Gmail, enable "less secure apps" or use an app password.

- File deletion errors: Verify the file paths and permissions for the uploads directory.

---

## Contributing
Contributions are welcome! 😊 Please create an issue or pull request to suggest changes.
---

