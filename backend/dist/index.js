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
const socket_1 = require("@lib/socket");
dotenv_1.default.config();
const PORT = process.env.PORT || 5001;
// allow extract to json data from body request - middleware
socket_1.app.use(express_1.default.json());
socket_1.app.use(body_parser_1.default.json({ limit: "50mb" }));
socket_1.app.use(body_parser_1.default.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
}));
socket_1.app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
// allow parse cookies
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.use("/api/auth", auth_route_1.default);
socket_1.app.use("/api/messages", message_route_1.default);
socket_1.server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    (0, db_1.connectDB)();
});
