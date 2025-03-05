"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("@lib/utils");
const user_model_1 = __importDefault(require("@models/user.model"));
const zod_1 = require("zod");
const signupSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "Имя обязательно"),
    lastName: zod_1.z.string().min(1, "Фамилия обязательна"),
    email: zod_1.z.string().email("Некорректный email"),
    password: zod_1.z
        .string()
        .min(6, "Пароль должен содержать минимум 6 символов")
        .regex(/[a-zA-Z]/, "Пароль должен содержать хотя бы одну букву")
        .regex(/\d/, "Пароль должен содержать хотя бы одну цифру")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Пароль должен содержать хотя бы один специальный символ"),
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = signupSchema.parse(req.body);
        const existingUser = yield user_model_1.default.exists({ email: parsedData.email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Такой пользователь уже существует." });
        }
        const salt = yield bcryptjs_1.default.genSalt(13);
        const hashedPassword = yield bcryptjs_1.default.hash(parsedData.password, salt);
        const newUser = yield user_model_1.default.create({
            firstName: parsedData.firstName,
            lastName: parsedData.lastName,
            email: parsedData.email,
            password: hashedPassword,
        });
        (0, utils_1.generateTokenJWT)({ userId: newUser._id, res });
        res.status(201).json({
            message: "Пользователь успешно создан!",
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            profilePicture: newUser.profilePicture,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res
                .status(400)
                .json({
                message: error.errors.map((e) => e.message).join(", "),
            });
        }
        console.error("Ошибка в signup controller:", error);
        res.status(500).json({ message: "Ошибка сервера." });
    }
});
exports.signup = signup;
