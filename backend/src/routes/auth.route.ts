import { signup } from "@controllers/auth.controller";
import { login } from "@controllers/login.controller";
import { logout } from "@controllers/logout.controller";
import { updateProfile } from "@controllers/updateProfile.controller";
import { protectRoute } from "@middleware/protectRoute.middleware";
import express, { Router } from "express";

const userActionsRouter: Router = express.Router();

//@ts-ignore
userActionsRouter.post("/signup", signup);

//@ts-ignore
userActionsRouter.post("/login", login);

userActionsRouter.post("/logout", logout);

//@ts-ignore
userActionsRouter.put("/profile", protectRoute, updateProfile);


export default userActionsRouter;
