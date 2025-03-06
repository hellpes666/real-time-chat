import { handleError } from "@lib/errorUtils";
import User from "@models/user.model";
import { Request, Response } from "express";

export const getUsersForSidebar = async (req: Request, res: Response) => {
	try {
		const loggedInUserId = req.user._id;
		// находим всех юзеров не равным нам;
		//? $ne - not equal
		const filteredUsers = await User.find({
			_id: { $ne: loggedInUserId },
		}).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		handleError(error, res, "Ошибка в getUsersForSidebar controller");
	}
};
