import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { handleError } from "../lib/handleError";
import { IAuthUser } from "../model/user";
import { useAuthStore } from "./useAuthStore";

interface IMessage {
	_id: string;
	text?: string;
	image?: string;
	senderId: any;
	receiverId: any;
	createdAt: string;
}
interface ChatState {
	messages: IMessage[];
	users: IAuthUser[];
	selectedUser: IAuthUser | null;
	isUsersLoading: boolean;
	isMessagesLoading: boolean;

	getUsers: () => void;
	getUserMessages: (userId: string | null) => void;
	setSelectedUser: (selectedUser: IAuthUser | null) => void;
	sendMessage: (messageData: IMessage) => void;
	subscribeToMessages: () => void;
	unsubscribeFromMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
	messages: [],
	users: [],
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,

	getUsers: async () => {
		set({ isUsersLoading: true });

		try {
			const response = await axiosInstance.get("messages/users");
			set({ users: response.data });
		} catch (error) {
			handleError(error, "store/useChatStore - getUsers");
			toast.error(
				"Ошибка получения пользователей.\nПопробуйте перезагрузить страницу."
			);
		} finally {
			set({ isUsersLoading: false });
		}
	},

	getUserMessages: async (userId: string | null) => {
		set({ isMessagesLoading: true });

		try {
			const response = await axiosInstance.get(`messages/${userId}`);
			set({ messages: response.data });
		} catch (error) {
			handleError(error, "store/useChatStore - getUserMessages");
			toast.error(
				"Ошибка загрузки сообщений.\nПопробуйте перезагрузить страницу."
			);
		} finally {
			set({ isMessagesLoading: false });
		}
	},

	sendMessage: async (messageData) => {
		const { selectedUser, messages } = get();

		try {
			const response = await axiosInstance.post(
				`messages/send/${selectedUser?._id}`,
				messageData
			);
			set({ messages: [...messages, response.data] });
		} catch (error) {
			toast.error("Ошибка отправки сообщения.");
			handleError(error, "store/useChatStore - sendMessages");
		}
	},

	subscribeToMessages: () => {
		const { selectedUser } = get();
		if (!selectedUser) return;

		const { socket } = useAuthStore.getState();
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		socket.on("newMessage", (newMessage: IMessage) => {
			const isMessageSentFromSelectedUser =
				newMessage.senderId === selectedUser._id;
			if (!isMessageSentFromSelectedUser) return;

			set({
				messages: [...get().messages, newMessage],
			});
		});
	},

	unsubscribeFromMessages: () => {
		const { socket } = useAuthStore.getState();
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		socket.off("newMessage");
	},

	setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
