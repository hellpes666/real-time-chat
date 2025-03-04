import { login, logout, signup } from "@controllers/auth.controller";
import express, { Router } from "express";

const authRouter: Router = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

export default authRouter;
