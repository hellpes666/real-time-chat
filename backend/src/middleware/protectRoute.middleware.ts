import { handleError } from "@lib/errorUtils";
import User from "@models/user.model";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
	namespace Express {
		interface Request {
			user?: InstanceType<typeof User>;
		}
	}
}

export const protectRoute = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res
				.status(401)
				.json({ message: "Вы не авторизованы. No Token Provided." });
		}

		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET!
		) as JwtPayload & { userId: string };

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(401).json({ message: "Пользователь не найден" });
		}

		req.user = user;
		next();
	} catch (error) {
		handleError(error, res, "Ошибка в protectRoute middleware");
	}
};
