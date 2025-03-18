import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userActionsRouter from "@routes/auth.route";
import { connectDB } from "@lib/db";
import cookieParser from "cookie-parser";
import messageRouter from "@routes/message.route";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5001;

// allow extract to json data from body request - middleware
app.use(express.json());

app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization", "profilePicture"],
	})
);
// allow parse cookies
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", userActionsRouter);

app.use("/api/message", messageRouter);

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
	connectDB();
});
