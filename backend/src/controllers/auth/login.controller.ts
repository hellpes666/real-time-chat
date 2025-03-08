import User from "@models/user.model";
import { z } from "zod";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateTokenJWT } from "@lib/utils";
import { handleError } from "@lib/errorUtils";

const loginSchema = z.object({
	email: z.string().email("Некорректный email"),
	password: z.string().min(6).max(128),
});

export const login = async (req: Request, res: Response) => {
	try {
		const parsedData = loginSchema.parse(req.body);

		const user = await User.findOne({ email: parsedData.email });

		if (
			!user ||
			!(await bcrypt.compare(parsedData.password, user.password))
		) {
			res.status(401).json({ message: "Неверные учетные данные." });
		} else {
			generateTokenJWT({ userId: user._id, res });
			res.status(200).json({
				message: "Авторизация успешна!",
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				profilePicture: user.profilePicture,
			});
		}
	} catch (error) {
		handleError(error, res, "Ошибка в login controller");
	}
};
