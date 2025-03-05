import { Response } from "express";
import jwt from "jsonwebtoken";

interface IGenerateTokenJWTParams {
	userId: unknown;
	res: Response;
}

export const generateTokenJWT = ({ userId, res }: IGenerateTokenJWTParams) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
		expiresIn: "7d",
	});

	res.cookie("jwt", token, {
		maxAge: 7 * 24 * 60 * 60 * 1000, // ms
		httpOnly: true, // защищает от XSS
		sameSite: "strict", // защищает от CSRF
		secure: process.env.NODE_ENV !== "development",
	});

	return token;
};
