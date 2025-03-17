import { useState } from "react";
import { Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";
import { ISignUpForm } from "../model/form";

const SignUpPage = () => {
	const [formData, setFormData] = useState<ISignUpForm>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const { signup, isSigningUp } = useAuthStore();

	const validateForm = () => {
		const formErrors: { [key: string]: string } = {};

		if (!formData.firstName.trim()) {
			formErrors.firstName = "First name is required";
			toast.error("First name is required");
		} else if (!formData.lastName.trim()) {
			formErrors.lastName = "Last name is required";
			toast.error("Last name is required");
		} else if (!formData.email.trim()) {
			formErrors.email = "Email is required";
			toast.error("Email is required");
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			formErrors.email = "Invalid email format";
			toast.error("Invalid email format");
		} else if (!formData.password) {
			formErrors.password = "Password is required";
			toast.error("Password is required");
		} else {
			if (formData.password.length < 6) {
				formErrors.password = "Password must be at least 6 characters";
				toast.error("Password must be at least 6 characters");
			}
			if (!/[a-zA-Z]/.test(formData.password)) {
				formErrors.password =
					"Password must contain at least one letter";
				toast.error("Password must contain at least one letter");
			}
			if (!/\d/.test(formData.password)) {
				formErrors.password =
					"Password must contain at least one number";
				toast.error("Password must contain at least one number");
			}
			if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
				formErrors.password =
					"Password must contain at least one special character";
				toast.error(
					"Password must contain at least one special character"
				);
			}
		}

		setErrors(formErrors);

		return Object.keys(formErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isValid = validateForm();

		if (isValid) {
			signup(formData);
		}
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
								Create Account
							</h1>
							<p className="text-base-content/60">
								Get started with your free account
							</p>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
							<label className="fieldset-label">First Name</label>
							<input
								type="text"
								className="input w-full"
								placeholder="First Name"
								value={formData.firstName}
								onChange={(e) =>
									setFormData({
										...formData,
										firstName: e.target.value,
									})
								}
							/>
							{errors.firstName && (
								<p className="text-error text-sm">
									{errors.firstName}
								</p>
							)}

							<label className="fieldset-label">Last Name</label>
							<input
								type="text"
								className="input w-full"
								placeholder="Last Name"
								value={formData.lastName}
								onChange={(e) =>
									setFormData({
										...formData,
										lastName: e.target.value,
									})
								}
							/>
							{errors.lastName && (
								<p className="text-error text-sm">
									{errors.lastName}
								</p>
							)}

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
							{errors.email && (
								<p className="text-error text-sm">
									{errors.email}
								</p>
							)}

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
								{errors.password && (
									<p className="text-error text-sm">
										{errors.password}
									</p>
								)}
							</div>

							<button
								type="submit"
								className="btn btn-primary w-full"
								disabled={isSigningUp}
							>
								{isSigningUp ? (
									<>
										<Loader2 className="size-5 animate-spin" />
										Loading...
									</>
								) : (
									"Create Account"
								)}
							</button>

							<div className="text-center">
								<p className="text-base-content/60">
									Already have an account?{" "}
									<Link
										to="/login"
										className="link link-primary"
									>
										Sign in
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

export default SignUpPage;
