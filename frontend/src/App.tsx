import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import {
	HomePage,
	SignUpPage,
	LoginPage,
	SettingsPage,
	ProfilePage,
} from "./pages";

const App = () => {
	return (
		<div>
			<Navbar />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
		</div>
	);
};

export default App;
