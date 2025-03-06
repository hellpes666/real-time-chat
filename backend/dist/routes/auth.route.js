"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("@controllers/auth/auth.controller");
const checkAuth_controller_1 = require("@controllers/auth/checkAuth.controller");
const login_controller_1 = require("@controllers/auth/login.controller");
const logout_controller_1 = require("@controllers/auth/logout.controller");
const updateProfile_controller_1 = require("@controllers/auth/updateProfile.controller");
const protectRoute_middleware_1 = require("@middleware/protectRoute.middleware");
const express_1 = __importDefault(require("express"));
const userActionsRouter = express_1.default.Router();
//@ts-ignore
userActionsRouter.post("/signup", auth_controller_1.signup);
//@ts-ignore
userActionsRouter.post("/login", login_controller_1.login);
userActionsRouter.post("/logout", logout_controller_1.logout);
//@ts-ignore
userActionsRouter.put("/profile", protectRoute_middleware_1.protectRoute, updateProfile_controller_1.updateProfile);
//@ts-ignore
userActionsRouter.get("/user", protectRoute_middleware_1.protectRoute, checkAuth_controller_1.checkAuth);
exports.default = userActionsRouter;
