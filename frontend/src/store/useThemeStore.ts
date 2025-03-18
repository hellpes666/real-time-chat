import { type Theme } from "./../constants/index";
import { create } from "zustand";

interface ThemeState {
	theme: Theme;
	setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
	theme: (localStorage.getItem("chat-theme") as Theme) || "coffee",
	setTheme: (theme: Theme) => {
		localStorage.setItem("chat-theme", theme);
		set({ theme });
	},
}));

