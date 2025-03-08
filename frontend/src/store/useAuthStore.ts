import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { IUser } from "../model/user";
import { handleError } from "../lib/handleError";
import toast from "react-hot-toast";

interface AuthState {
	authUser: IUser | null;
	isCheckingAuth: boolean;

	isSigningUp: boolean;
	isLoggingIn: boolean;
	isUpdatingProfile: boolean;
	checkAuth: () => void;
	signup: (data: IUser) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	authUser: null, // Изначально пользователь не аутентифицирован
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,

	isCheckingAuth: true, // Начальная проверка аутентификации

	signup: async (data: IUser) => {
		const res = await axiosInstance.post("auth/signup", data);
		try {
			set({ authUser: res.data });
			toast.success("Acoount created successfully");
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
		} catch (error) {
			set({ authUser: null });

			handleError(error, "store/useAuthStore - checkAuth");
		} finally {
			set({ isCheckingAuth: false });
		}
	},
}));
