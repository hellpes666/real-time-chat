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
exports.login = void 0;
const user_model_1 = __importDefault(require("@models/user.model"));
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("@lib/utils");
const errorUtils_1 = require("@lib/errorUtils");
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Некорректный email"),
    password: zod_1.z
        .string()
        .min(6, "Пароль должен содержать минимум 6 символов")
        .max(128, "Пароль не может содержать более 128 символов")
        .regex(/[a-zA-Z]/, "Пароль должен содержать хотя бы одну букву")
        .regex(/\d/, "Пароль должен содержать хотя бы одну цифру")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Пароль должен содержать хотя бы один специальный символ"),
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = loginSchema.parse(req.body);
        const user = yield user_model_1.default.findOne({ email: parsedData.email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Пожалуйста, пройдите регистрацию." });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(parsedData.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Неверный пароль." });
        }
        (0, utils_1.generateTokenJWT)({ userId: user._id, res });
        res.status(200).json({
            message: "Авторизация успешна!",
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    }
    catch (error) {
        (0, errorUtils_1.handleError)(error, res, "Ошибка в login controller");
    }
});
exports.login = login;
