import express from "express";
import type { Router } from "express";

const AuthRouter: Router = express.Router();

AuthRouter.post("/register", async (): Promise<void> => {});

export default AuthRouter;
