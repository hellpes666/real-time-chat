"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokenJWT = ({ userId, res }) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const token = jsonwebtoken_1.default.sign({ userId }, secret, {
        expiresIn: "7d",
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Protects the cookie from being accessed via JavaScript (XSS protection)
        sameSite: "strict", // CSRF protection
        secure: process.env.NODE_ENV !== "development", // Set cookie to 'secure' in production
    });
    return token;
};
exports.generateTokenJWT = generateTokenJWT;
