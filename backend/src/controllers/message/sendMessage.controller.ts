import cloudinary from "@lib/cloudinary";
import { handleError } from "@lib/errorUtils";
import Message from "@models/message.model";
import { Request, Response } from "express";

export const sendMessage = async (req: Request, res: Response) => {
	try {
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		const { text, image } = req.body;

		let imageUrl;

		if (image) {
			const uploadResponse = await cloudinary.uploader.upload(image);
			imageUrl = uploadResponse.secure_url;
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			text,
			image: imageUrl,
		});

		await newMessage.save();

		//TODO real-time \

		res.status(201).json(newMessage);
	} catch (error) {
		handleError(error, res, "Ошибка в sendMessage controller");
	}
};
