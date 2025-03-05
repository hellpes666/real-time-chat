import { handleError } from "@lib/errorUtils";
import { Request, Response } from "express";

export const updateProfile = async (req: Request, res: Response) => {
	try {
		
	} catch (error) {
		handleError(error, res, "Ошибка в updateProfile controller");
	}
};
