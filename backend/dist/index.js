"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("@routes/auth.route"));
const db_1 = require("@lib/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const message_route_1 = __importDefault(require("@routes/message.route"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// allow extract to json data from body request - middleware
app.use(express_1.default.json());
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
}));
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
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// allow parse cookies
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_route_1.default);
app.use("/api/messages", message_route_1.default);
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
    (0, db_1.connectDB)();
});
