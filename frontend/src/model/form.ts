interface IAuthForm {
	email: string;
	password: string;
}

export interface ISignUpForm extends IAuthForm {
	firstName: string;
	lastName: string;
}
