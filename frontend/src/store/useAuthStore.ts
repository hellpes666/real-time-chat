import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { IUser } from "../model/user";

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

			const curError = error as Error;

			console.error("Error in useAuthStore:", curError);
		} finally {
			set({ isCheckingAuth: false });
		}
	},
}));
