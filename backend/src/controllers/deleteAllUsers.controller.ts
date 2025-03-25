import { handleError } from "@lib/errorUtils";
import User from "@models/user.model";
import { Request, Response } from "express";

export const deleteAllUsers = async (req: Request, res: Response) => {
	try {
		await User.deleteMany({});

		res.status(200).json({ message: "Ты их удалил..." });
	} catch (error) {
		handleError(error, res, "Ошибка в deleteAllUsers.controller.ts");
	}
};
