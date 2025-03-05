import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateTokenJWT } from "@lib/utils";
import User from "@models/user.model";
import { z } from "zod";

const signupSchema = z.object({
	firstName: z
		.string()
		.min(1, "Имя обязательно")
		.max(128, "Имя не может быть длиньше 36 символов"),
	lastName: z
		.string()
		.min(1, "Фамилия обязательна")
		.max(128, "Фамилия не может быть длиньше 36 символов"),
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

export const signup = async (req: Request, res: Response) => {
	try {
		const parsedData = signupSchema.parse(req.body);

		const existingUser = await User.exists({ email: parsedData.email });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "Такой пользователь уже существует." });
		}

		const salt = await bcrypt.genSalt(13);
		const hashedPassword = await bcrypt.hash(parsedData.password, salt);

		const newUser = await User.create({
			firstName: parsedData.firstName,
			lastName: parsedData.lastName,
			email: parsedData.email,
			password: hashedPassword,
		});

		generateTokenJWT({ userId: newUser._id, res });

		res.status(201).json({
			message: "Пользователь успешно создан!",
			_id: newUser._id,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
			profilePicture: newUser.profilePicture,
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({
				message: error.errors.map((e) => e.message).join(", "),
			});
		}
		console.error("Ошибка в signup controller:", error);
		res.status(500).json({ message: "Ошибка сервера." });
	}
};
