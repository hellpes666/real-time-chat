"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const zod_1 = require("zod");
const handleError = (error, res, context) => {
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: error.errors.map((e) => e.message).join(", "),
        });
    }
    console.error(`${context}:`, error);
    res.status(500).json({ message: "Ошибка сервера." });
};
exports.handleError = handleError;
