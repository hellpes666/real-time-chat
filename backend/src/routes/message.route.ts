import { getMessages } from "@controllers/message/getMessages.controller";
import { getUsersForSidebar } from "@controllers/message/getUsersForSidebar.controller";
import { sendMessage } from "@controllers/message/sendMessage.controller";
import { protectRoute } from "@middleware/protectRoute.middleware";
import express, { Router } from "express";

const messageRouter: Router = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);

messageRouter.get("/:id", protectRoute, getMessages);

messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;
