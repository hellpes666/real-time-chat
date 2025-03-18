import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { MessageSkeleton } from "./skeletons";
import { ChatHeader, MessageInput } from ".";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
	const { messages, getUserMessages, isMessagesLoading, selectedUser } =
		useChatStore();

	const { authUser } = useAuthStore();

	useEffect(() => {
		const currentUserIdOrNull =
			selectedUser === null ? null : selectedUser._id;

		getUserMessages(currentUserIdOrNull);
	}, [getUserMessages, selectedUser]);
	if (isMessagesLoading) return <MessageSkeleton />;

	return (
		<div className="flex-1 flex flex-col overflow-auto">
			<ChatHeader />

			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.map((message) => (
					<div
						className={`chat ${
							message.senderId === authUser?._id
								? "chat-end"
								: "chat-start"
						}`}
						key={message._id}
					>
						<div className=" chat-image avatar">
							<div className="size-10 rounded-full border">
								<img
									src={
										message.senderId === authUser?._id
											? authUser?.profilePicture ||
											  "/avatar.jpg"
											: selectedUser?.profilePicture ||
											  "/avatar.jpg"
									}
									alt="profile pic"
								/>
							</div>
						</div>
						<div className="chat-header mb-1">
							<time className="text-xs opacity-50 ml-1">
								{formatMessageTime(message.createdAt)}
							</time>
						</div>
						<div className="chat-bubble flex flex-col">
							{message.image && (
								<img
									src={message.image}
									alt="Attachment"
									className="sm:max-w-[200px] rounded-md mb-2"
								/>
							)}
							{message.text && <p>{message.text}</p>}
						</div>
					</div>
				))}
			</div>

			<MessageInput />
		</div>
	);
};

export default ChatContainer;
