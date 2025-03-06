import React, { useState } from "react";
import { ISignUpForm } from "../model/form";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, User } from "lucide-react";

const SignUpPage = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [formData, setFormData] = useState<ISignUpForm>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const { signup, isSigningUp } = useAuthStore();

	const validateForm = () => {};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
	};

	return (
		<div className="min-h-screen grid lg:grid-cols-2">
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
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
				</div>

				<fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
					<legend className="fieldset-legend">SignUp</legend>

					<label className="fieldset-label">First Name</label>
					<input
						type="text"
						className="input"
						placeholder="First Name"
					/>

					<label className="fieldset-label">Last Name</label>
					<input
						type="text"
						className="input"
						placeholder="Last Name"
					/>

					<label className="fieldset-label">Email</label>
					<input type="email" className="input" placeholder="Email" />

					<label className="fieldset-label">Password</label>
					<input
						type="password"
						className="input"
						placeholder="Password"
					/>

					<button className="btn btn-neutral mt-4">Sign Up</button>
				</fieldset>
			</div>
		</div>
	);
};

export default SignUpPage;
