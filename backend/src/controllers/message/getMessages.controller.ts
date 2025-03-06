import { handleError } from "@lib/errorUtils";
import Message from "@models/message.model";
import { Request, Response } from "express";

export const getMessages = async (req: Request, res: Response) => {
	try {
		const { id: userToChatId } = req.params;
		const myId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ senderId: myId, receiverId: userToChatId },
				{ senderId: userToChatId, receiverId: myId },
			],
		});

		res.status(200).json(messages);
	} catch (error) {
		handleError(error, res, "Ошибка в getMessages controller");
	}
};
