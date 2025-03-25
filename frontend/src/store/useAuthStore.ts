import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { IAuthUser, IUser } from "../model/user";
import { handleError } from "../lib/handleError";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001 ";

interface AuthState {
	authUser: IAuthUser | null;

	isCheckingAuth: boolean;
	isSigningUp: boolean;
	isLoggingIn: boolean;
	isUpdatingProfile: boolean;
	onlineUsers: IAuthUser[];

	socket: any | null;

	logout: () => void;
	login: (data: Omit<IUser, "firstName" | "lastName">) => void;
	checkAuth: () => void;
	signup: (data: IUser) => void;
	updateProfile: (data: {
		profilePicture: string | ArrayBuffer | null;
	}) => void;

	connectSocket: () => void;
	disconnectSocket: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	authUser: null, // Изначально пользователь не аутентифицирован
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	onlineUsers: [],
	isCheckingAuth: true, // Начальная проверка аутентификации
	socket: null,

	signup: async (data: IUser) => {
		const res = await axiosInstance.post("auth/signup", data);
		try {
			set({ authUser: res.data });
			toast.success("Acoount created successfully");
			get().connectSocket();
		} catch (error) {
			handleError(error, "store/useAuthStore - signup");
			toast.error(res.data.message);
		} finally {
			set({ isSigningUp: false });
		}
	},
	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("auth/user");
			set({ authUser: res.data });

			get().connectSocket();
		} catch (error) {
			set({ authUser: null });

			handleError(error, "store/useAuthStore - checkAuth");
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("auth/logout");
			set({ authUser: null });
			toast.success("Вы успешно вышли");
			get().disconnectSocket();
		} catch (error) {
			handleError(error, "store/useAuthStore - logout");
		}
	},

	login: async (data: Omit<IUser, "firstName" | "lastName">) => {
		set({ isLoggingIn: true });
		try {
			const response = await axiosInstance.post("auth/login", data);
			set({ authUser: response.data });
			toast.success("Вы успешно зашли");

			get().connectSocket();
		} catch (error) {
			toast.error("Некорректные данные");
			handleError(error, "store/useAuthStore - login");
		} finally {
			set({ isLoggingIn: false });
		}
	},

	updateProfile: async (data) => {
		set({ isUpdatingProfile: true });
		try {
			const response = await axiosInstance.put("auth/profile", data);
			set({ authUser: response.data });
			toast.success("Аватар успешно загружен");
		} catch (error) {
			toast.error("Не удалось загрузить картинку");
			handleError(error, "store/useAuthStore - updateProfile");
		} finally {
			set({ isUpdatingProfile: false });
		}
	},
	connectSocket: () => {
		const { authUser } = get();
		console.log("CONNECT SOCKET", authUser);
		if (!authUser || get().socket?.connected) return;
		/*
		, {
			query: {
				userId: authUser._id,
			},
		}
		*/
		const socket = io(BASE_URL);
		socket.connect();

		set({ socket: socket });

		socket.on("getOnlineUsers", (userIds) => {
			set({ onlineUsers: userIds });
		});
	},

	disconnectSocket: () => {
		if (get().socket?.connected) get().socket?.disconnect();
	},
}));
