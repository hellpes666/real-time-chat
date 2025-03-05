import { Request, Response } from "express";
import { handleError } from "@lib/errorUtils";

export const logout = async (req: Request, res: Response) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({
			message: "Вы успешно вышли из акаунта. Будем ждать вас снова!",
		});
	} catch (error) {
		handleError(error, res, "Ошибка в logout controller:");
	}
};
