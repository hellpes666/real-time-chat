import { signup } from "@controllers/auth.controller";
import { login } from "@controllers/login.controller";
import express, { Router, Request, Response } from "express";

const authRouter: Router = express.Router();

//@ts-ignore
authRouter.post("/signup", signup);

//@ts-ignore
authRouter.post("/login", login);

// authRouter.post("/logout", logout);

export default authRouter;
