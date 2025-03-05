import { v2 as cloudinary, type ConfigOptions } from "cloudinary";
import { config } from "dotenv";

config();

const validateEnvVariables = () => {
	const requiredVariables = [
		"CLOUDINARY_CLOUD_NAME",
		"CLOUDINARY_API_KEY",
		"CLOUDINARY_API_SECRET",
	];

	const missingVariables = requiredVariables.filter(
		(varName) => !process.env[varName]
	);

	if (missingVariables.length > 0) {
		throw new Error(
			`Отсутствуют переменные окружения Cloudinary: ${missingVariables.join(
				", "
			)}`
		);
	}
};

validateEnvVariables();

const cloudinaryConfig: ConfigOptions = {
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
	api_key: process.env.CLOUDINARY_API_KEY!,
	api_secret: process.env.CLOUDINARY_API_SECRET!,
	secure: process.env.NODE_ENV === "production",
};

cloudinary.config(cloudinaryConfig);

export interface CloudinaryUploadResponse {
	public_id: string;
	url: string;
	secure_url: string;
	format: string;
	width: number;
	height: number;
}

export default cloudinary;
