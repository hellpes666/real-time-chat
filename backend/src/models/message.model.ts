import mongoose, { Document, Schema } from "mongoose";

interface IMessage extends Document {
	text?: string;
	image?: string;
	senderId: mongoose.Schema.Types.ObjectId;
	receiverId: mongoose.Schema.Types.ObjectId;
}

const messageSchema = new Schema<IMessage>(
	{
		text: {
			type: String,
		},

		image: {
			type: String,
		},

		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
