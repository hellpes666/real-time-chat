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

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 50000,
	})
);

// app.use(
// 	cors({
// 		origin: ["http://localhost:3000"],
// 		credentials: true,
// 	})
// );

const whitelist = [
	"http://localhost:3000",
	"https://avatars.mds.yandex.net/i?id=bb15cb2513a1342ae1883fdd6eb6e753_l-4055448-images-thumbs&n=13",
];
const corsOptions = {
	//@ts-ignore
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};
app.use(cors(corsOptions));

// allow parse cookies
app.use(cookieParser());

app.use("/api/auth", userActionsRouter);

app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
	connectDB();
});
