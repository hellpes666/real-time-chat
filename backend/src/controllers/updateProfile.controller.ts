import cloudinary from "@lib/cloudinary";
import { handleError } from "@lib/errorUtils";
import User from "@models/user.model";
import { Request, Response } from "express";

export const updateProfile = async (req: Request, res: Response) => {
	try {
		const { profilePicture } = req.body;

		const userId = req.user._id;

		if (!profilePicture) {
			return res
				.status(400)
				.json({ message: "Изображение профиля не найдено." });
		}

		const uploadResponse = await cloudinary.uploader.upload(profilePicture);
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				profilePicture: uploadResponse.secure_url,
			},
			{ new: true }
		);

		res.status(200).json(updatedUser);
	} catch (error) {
		handleError(error, res, "Ошибка в updateProfile controller");
	}
};
