import { handleError } from "@lib/errorUtils";
import User from "@models/user.model";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const protectRoute = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// Извлекаем токен из cookies
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({
				message: "Вы не авторизованы. No Token Provided.",
			});
		}

		// Проверяем токен с использованием секретного ключа
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET!
		) as JwtPayload & { userId: string };

		if (!decoded || !decoded.userId) {
			return res.status(401).json({ message: "Unauthorized - Invalid Token" });
		}

		// Ищем пользователя по userId из токена
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(401).json({ message: "Пользователь не найден" });
		}

		// Добавляем пользователя в запрос
		req.user = user;

		// Переходим к следующему middleware
		next();
	} catch (error) {
		// Обработка ошибки
		handleError(error, res, "Ошибка в protectRoute middleware");
	}
};
