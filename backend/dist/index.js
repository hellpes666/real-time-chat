"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("@routes/auth.route"));
const db_1 = require("@lib/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// allow extract to json data from body request - middleware
app.use(express_1.default.json());
app.use("/api/auth", auth_route_1.default);
app.get("/", (req, res) => {
    res.send("sad + TypeScript Server");
});
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
    (0, db_1.connectDB)();
});
