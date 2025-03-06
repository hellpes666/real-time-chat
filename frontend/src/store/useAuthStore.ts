import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { IUser } from "../model/user";
import { handleError } from "../lib/handleError";

interface AuthState {
	authUser: IUser | null;
	isCheckingAuth: boolean;

	isSigningUp: boolean;
	isLoggingIn: boolean;
	isUpdatingProfile: boolean;
	checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	authUser: null, // Изначально пользователь не аутентифицирован
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,

	isCheckingAuth: true, // Начальная проверка аутентификации

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("auth/user");

			set({ authUser: res.data });
		} catch (error) {
			set({ authUser: null });

			handleError(error, "store/useAuthStore - checkAuth");
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signup: async (data: IUser) => {
		try {
			const res = await axiosInstance.post("auth/signup", data);
			set({ authUser: res.data });
		} catch (error) {
			handleError(error, "store/useAuthStore - signup");
		}
	},
}));
