import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import {
	HomePage,
	SignUpPage,
	LoginPage,
	SettingsPage,
	ProfilePage,
} from "./pages";
import { useAuthStore } from "./store/useAuthStore";
import { JSX, useEffect } from "react";
import { Loader } from "lucide-react";
import { IUser } from "./model/user";

const App = () => {
	const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	console.log({ authUser });

	if (isCheckingAuth && !authUser) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader className="size-10 animate-spin" />
			</div>
		);
	}

	const redirectNotAuthUser = (
		currentStateAuthUser: IUser | null | boolean,
		comp: JSX.Element,
		redirectTo: "/" | "/login"
	): JSX.Element => {
		return currentStateAuthUser ? comp : <Navigate to={redirectTo} />;
	};

	return (
		<div>
			<Navbar />

			<Routes>
				<Route
					path="/"
					element={redirectNotAuthUser(
						authUser,
						<HomePage />,
						"/login"
					)}
				/>
				<Route
					path="/signup"
					element={redirectNotAuthUser(
						!authUser,
						<SignUpPage />,
						"/"
					)}
				/>
				<Route
					path="/login"
					element={redirectNotAuthUser(!authUser, <LoginPage />, "/")}
				/>
				<Route path="/settings" element={<SettingsPage />} />
				<Route
					path="/profile"
					element={redirectNotAuthUser(
						authUser,
						<ProfilePage />,
						"/login"
					)}
				/>
			</Routes>
		</div>
	);
};

export default App;
