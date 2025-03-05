import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	profilePicture?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
		},
		profilePicture: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
