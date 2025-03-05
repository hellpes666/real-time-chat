import { Response } from "express";
import { ZodError } from "zod";

export const handleError = (error: unknown, res: Response, context: string) => {
	if (error instanceof ZodError) {
		return res.status(400).json({
			message: error.errors.map((e) => e.message).join(", "),
		});
	}

	console.error(`${context}:`, error);

	res.status(500).json({ message: "Ошибка сервера." });
};
