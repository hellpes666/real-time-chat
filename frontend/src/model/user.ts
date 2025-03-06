export interface IUser {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	profilePicture?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
