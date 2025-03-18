"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getMessages_controller_1 = require("@controllers/message/getMessages.controller");
const getUsersForSidebar_controller_1 = require("@controllers/message/getUsersForSidebar.controller");
const sendMessage_controller_1 = require("@controllers/message/sendMessage.controller");
const protectRoute_middleware_1 = require("@middleware/protectRoute.middleware");
const express_1 = __importDefault(require("express"));
const messageRouter = express_1.default.Router();
messageRouter.get("/users", protectRoute_middleware_1.protectRoute, getUsersForSidebar_controller_1.getUsersForSidebar);
messageRouter.get("/:id", protectRoute_middleware_1.protectRoute, getMessages_controller_1.getMessages);
messageRouter.post("/send/:id", protectRoute_middleware_1.protectRoute, sendMessage_controller_1.sendMessage);
exports.default = messageRouter;
