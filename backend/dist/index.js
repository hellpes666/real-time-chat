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
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// allow extract to json data from body request - middleware
app.use(express_1.default.json());
// allow parse cookies
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_route_1.default);
app.use("/api/message", message_route_1.default);
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
    (0, db_1.connectDB)();
});
