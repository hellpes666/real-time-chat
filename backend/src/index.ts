import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userActionsRouter from "@routes/auth.route";
import { connectDB } from "@lib/db";
import cookieParser from "cookie-parser";
import messageRouter from "@routes/message.route";
import cors from "cors";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5001;

// allow extract to json data from body request - middleware
app.use(express.json());

// allow parse cookies
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieParser());

app.use("/api/auth", userActionsRouter);

app.use("/api/message", messageRouter);

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
	connectDB();
});
