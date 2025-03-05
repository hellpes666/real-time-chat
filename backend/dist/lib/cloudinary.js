"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const validateEnvVariables = () => {
    const requiredVariables = [
        "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_API_KEY",
        "CLOUDINARY_API_SECRET",
    ];
    const missingVariables = requiredVariables.filter((varName) => !process.env[varName]);
    if (missingVariables.length > 0) {
        throw new Error(`Отсутствуют переменные окружения Cloudinary: ${missingVariables.join(", ")}`);
    }
};
validateEnvVariables();
const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: process.env.NODE_ENV === "production",
};
cloudinary_1.v2.config(cloudinaryConfig);
exports.default = cloudinary_1.v2;
