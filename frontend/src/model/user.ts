export interface IUser {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

export interface IAuthUser extends IUser {
	profilePicture: string | ArrayBuffer | null;
	createdAt?: Date;
	updatedAt?: Date;
}
