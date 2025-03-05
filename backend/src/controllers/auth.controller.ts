import User from "@models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateTokenJWT } from "@lib/utils";

export interface ISignupRequestBody {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const signup = async (
	req: Request<{}, {}, ISignupRequestBody>,
	res: Response
) => {
	const { firstName, lastName, email, password } = req.body;

	try {
		if (!firstName || !lastName || !email || !password) {
			return res.status(400).json({
				message: "Пожалуйста, заполните все поля.",
			});
		}

		if (password.length < 6) {
			return res.status(400).json({
				message: "Пароль должен содержать минимум 6 символов.",
			});
		}

		const hasNumber = /\d/; // Проверяет, есть ли хотя бы одна цифра
		const hasLetter = /[a-zA-Z]/; // Проверяет, есть ли хотя бы одна буква

		if (!hasNumber.test(password) || !hasLetter.test(password)) {
			return res.status(400).json({
				message:
					"Пароль должен содержать как минимум одну цифру и одну букву.",
			});
		}

		const mustHaveSpecialSymbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
		if (!mustHaveSpecialSymbolRegex.test(password)) {
			return res.status(400).json({
				message:
					"Пароль должен содержать хотя бы один специальный символ.",
			});
		}

		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				message: "Такой пользователь уже существует.",
			});
		}

		const salt = await bcrypt.genSalt(13);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hashedPassword,
		});

		await newUser.save();

		generateTokenJWT({ userId: newUser._id, res });

		res.status(201).json({
			message: "Пользователь успешно создан!",
			_id: newUser._id,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
			profilePicture: newUser.profilePicture,
		});
	} catch (error: unknown) {
		const errorMessage = (error as Error).message || "Неизвестная ошибка";
		console.log("Ошибка в signup controller", errorMessage);
		res.status(500).json({ message: "Ошибка сервера." });
	}
};
