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
const user_model_1 = __importDefault(require("@models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("@lib/utils");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "Пожалуйста, заполните все поля.",
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Пароль должен содержать минимум 6 символов.",
            });
        }
        const hasNumber = /\d/; // Проверяет, есть ли хотя бы одна цифра
        const hasLetter = /[a-zA-Z]/; // Проверяет, есть ли хотя бы одна буква
        if (!hasNumber.test(password) || !hasLetter.test(password)) {
            return res.status(400).json({
                message: "Пароль должен содержать как минимум одну цифру и одну букву.",
            });
        }
        const mustHaveSpecialSymbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!mustHaveSpecialSymbolRegex.test(password)) {
            return res.status(400).json({
                message: "Пароль должен содержать хотя бы один специальный символ.",
            });
        }
        const user = yield user_model_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Такой пользователь уже существует.",
            });
        }
        const salt = yield bcryptjs_1.default.genSalt(13);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = new user_model_1.default({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        });
        yield newUser.save();
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
        const errorMessage = error.message || "Неизвестная ошибка";
        console.log("Ошибка в signup controller", errorMessage);
        res.status(500).json({ message: "Ошибка сервера." });
    }
});
exports.signup = signup;
