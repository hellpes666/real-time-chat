import { signup } from "@controllers/auth/auth.controller";
import { checkAuth } from "@controllers/auth/checkAuth.controller";
import { login } from "@controllers/auth/login.controller";
import { logout } from "@controllers/auth/logout.controller";
import { updateProfile } from "@controllers/auth/updateProfile.controller";
import { protectRoute } from "@middleware/protectRoute.middleware";
import express, { Router } from "express";

const userActionsRouter: Router = express.Router();

userActionsRouter.post("/signup", signup);

userActionsRouter.post("/login", login);

userActionsRouter.post("/logout", logout);

//@ts-ignore
userActionsRouter.put("/profile", protectRoute, updateProfile);

//@ts-ignore
userActionsRouter.get("/user", protectRoute, checkAuth);

export default userActionsRouter;
