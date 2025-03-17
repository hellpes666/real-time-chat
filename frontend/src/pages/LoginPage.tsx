import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthImagePattern } from "../components";
import { IAuthForm } from "../model/form";

const LoginPage = () => {
	const [formData, setFormData] = useState<IAuthForm>({
		email: "",
		password: "",
	});
	const { login, isLoggingIn } = useAuthStore();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		login(formData);
	};
	return (
		<div className="min-h-screen grid lg:grid-cols-2">
			{/* left side */}
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<div
								className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
	  group-hover:bg-primary/20 transition-colors"
							>
								<MessageSquare className="size-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold mt-2">
								Welcome Back
							</h1>
							<p className="text-base-content/60">
								Sign in to your account
							</p>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
							<label className="fieldset-label">Email</label>
							<input
								type="email"
								className="input w-full"
								placeholder="Email"
								value={formData.email}
								onChange={(e) =>
									setFormData({
										...formData,
										email: e.target.value,
									})
								}
							/>

							{/* Password */}
							<label className="fieldset-label">Password</label>
							<div className="flex flex-col items-start mb-8">
								<input
									className="input w-full"
									type="password"
									placeholder="Password"
									value={formData.password}
									onChange={(e) =>
										setFormData({
											...formData,
											password: e.target.value,
										})
									}
								/>
							</div>

							<button
								type="submit"
								className="btn btn-primary w-full"
								disabled={isLoggingIn}
							>
								{isLoggingIn ? (
									<>
										<Loader2 className="size-5 animate-spin" />
										Loading...
									</>
								) : (
									"Sign In"
								)}
							</button>

							<div className="text-center">
								<p className="text-base-content/60">
									Don't have an account?{" "}
									<Link
										to="/signup"
										className="link link-primary"
									>
										Create account
									</Link>
								</p>
							</div>
						</fieldset>
					</form>
				</div>
			</div>

			{/* right side */}
			<AuthImagePattern
				title="Join our community"
				subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
			/>
		</div>
	);
};

export default LoginPage;
