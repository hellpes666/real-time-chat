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
exports.protectRoute = void 0;
const errorUtils_1 = require("@lib/errorUtils");
const user_model_1 = __importDefault(require("@models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Извлекаем токен из cookies
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({
                message: "Вы не авторизованы. No Token Provided.",
            });
        }
        // Проверяем токен с использованием секретного ключа
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }
        // Ищем пользователя по userId из токена
        const user = yield user_model_1.default.findById(decoded.userId).select("-password");
        if (!user) {
            res.status(401).json({ message: "Пользователь не найден" });
        }
        // Добавляем пользователя в запрос
        req.user = user;
        // Переходим к следующему middleware
        next();
    }
    catch (error) {
        // Обработка ошибки
        (0, errorUtils_1.handleError)(error, res, "Ошибка в protectRoute middleware");
    }
});
exports.protectRoute = protectRoute;
