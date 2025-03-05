import User from "@models/user.model";
import { z } from "zod";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateTokenJWT } from "@lib/utils";
import { handleError } from "@lib/errorUtils";

const loginSchema = z.object({
	email: z.string().email("Некорректный email"),
	password: z
		.string()
		.min(6, "Пароль должен содержать минимум 6 символов")
		.max(128, "Пароль не может содержать более 128 символов")
		.regex(/[a-zA-Z]/, "Пароль должен содержать хотя бы одну букву")
		.regex(/\d/, "Пароль должен содержать хотя бы одну цифру")
		.regex(
			/[!@#$%^&*(),.?":{}|<>]/,
			"Пароль должен содержать хотя бы один специальный символ"
		),
});

export const login = async (req: Request, res: Response) => {
	try {
		const parsedData = loginSchema.parse(req.body);

		const user = await User.findOne({ email: parsedData.email });

		if (!user) {
			return res
				.status(400)
				.json({ message: "Пожалуйста, пройдите регистрацию." });
		}

		const isPasswordCorrect: boolean = await bcrypt.compare(
			parsedData.password,
			user.password
		);

		if (!isPasswordCorrect) {
			return res.status(401).json({ message: "Неверный пароль." });
		}

		generateTokenJWT({ userId: user._id, res });

		res.status(200).json({
			message: "Авторизация успешна!",
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			profilePicture: user.profilePicture,
		});
	} catch (error) {
		handleError(error, res, "Ошибка в login controller");
	}
};
