import { handleError } from "@lib/errorUtils";
import { Request, Response } from "express";

export const checkAuth = (req: Request, res: Response) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		handleError(error, res, "Ошибка в checkAuth controller");
	}
};
