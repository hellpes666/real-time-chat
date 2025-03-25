import express from "express";
import dotenv from "dotenv";
import userActionsRouter from "@routes/auth.route";
import { connectDB } from "@lib/db";
import cookieParser from "cookie-parser";
import messageRouter from "@routes/message.route";
import cors from "cors";
import bodyParser from "body-parser";
import { app, server } from "@lib/socket";

dotenv.config();

const PORT = process.env.PORT || 5001;

// allow extract to json data from body request - middleware
app.use(express.json());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 50000,
	})
);

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

// allow parse cookies
app.use(cookieParser());

app.use("/api/auth", userActionsRouter);

app.use("/api/messages", messageRouter);

server.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
	connectDB();
});
