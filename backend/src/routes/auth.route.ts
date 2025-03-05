import { signup } from "@controllers/auth.controller";
import express, { Router, Request, Response } from "express";

const authRouter: Router = express.Router();

//@ts-ignore
authRouter.post("/signup", signup);

// authRouter.post("/login", login);

// authRouter.post("/logout", logout);

export default authRouter;
