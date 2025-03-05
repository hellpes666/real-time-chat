import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userActionsRouter from "@routes/auth.route";
import { connectDB } from "@lib/db";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5001;

// allow extract to json data from body request - middleware
app.use(express.json());

app.use("/api/auth", userActionsRouter);

// allow parse cookies
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
	res.send("sad + TypeScript Server");
});

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
	connectDB();
});
