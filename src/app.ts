import express, { Application } from "express";
import dotenv from "dotenv";
import { Auth } from "./middleware/validateApiKey";
import { EmailController } from "./controllers/emailController";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


app.get("/ping", (req, res) => {
  res.json({ message: "Test route is working!" });
});

app.post("/api/send-email", Auth.validateApiKey, EmailController.sendEmail);


app.use("/", (req, res) => {
  res.send("Welcome to the Email Service API ❤️");
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
