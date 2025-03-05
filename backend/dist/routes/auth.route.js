"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("@controllers/auth.controller");
const login_controller_1 = require("@controllers/login.controller");
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
//@ts-ignore
authRouter.post("/signup", auth_controller_1.signup);
//@ts-ignore
authRouter.post("/login", login_controller_1.login);
// authRouter.post("/logout", logout);
exports.default = authRouter;
