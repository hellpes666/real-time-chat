import { Response } from "express";
import jwt from "jsonwebtoken";

interface IGenerateTokenJWTParams {
	userId: unknown;
	res: Response;
}

export const generateTokenJWT = ({ userId, res }: IGenerateTokenJWTParams) => {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT_SECRET is not defined in environment variables.");
	}

	const token = jwt.sign({ userId }, secret, {
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
