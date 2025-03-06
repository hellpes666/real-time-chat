"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const errorUtils_1 = require("@lib/errorUtils");
const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    }
    catch (error) {
        (0, errorUtils_1.handleError)(error, res, "Ошибка в checkAuth controller");
    }
};
exports.checkAuth = checkAuth;
