declare namespace NodeJS {
	interface ProcessEnv {
		CLOUDINARY_CLOUD_NAME: string;
		CLOUDINARY_API_KEY: string;
		CLOUDINARY_API_SECRET: string;
		PORT: string;
		MONGODB_URI: string;
		JWT_SECRET: string;
		NODE_ENV: string;
	}
}
