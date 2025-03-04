import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "@routes/auth.route";
import { connectDB } from "@lib/db";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("sad + TypeScript Server");
});

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
	connectDB();
});
