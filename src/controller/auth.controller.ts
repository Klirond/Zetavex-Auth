import type { Response, Request, NextFunction } from "express";
import wrapper from "../middlewares/asyncWrapper.middleware.ts";
import crypto from "crypto";

import IdModel from "../model/id.ts";

const register = wrapper(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    const {
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    } = req.body;

    const code: number = crypto.randomInt(100000, 999999);
    const expiry: Date = new Date(Date.now() + 10 * 60 * 1000);

    const user = {
      username: username.trim(),
      email: email.toLowerCase(),
      password: password,
      verificationCode: code,
      verificationExpiry: expiry,
    };

    const newUser = new IdModel(user);

    await newUser.save();

    return res.status(201).json({
      status: 201,
      message: "New verification code sent to email",
    });
  },
);

export { register };
