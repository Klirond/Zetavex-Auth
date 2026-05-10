import express from "express";
import type { Router } from "express";

import { register } from "../controller/auth.controller.ts";

const AuthRouter: Router = express.Router();

AuthRouter.post("/register", register);

export default AuthRouter;
