import type { Response, Request } from "express";
import wrapper from "../middlewares/asyncWrapper.middleware.ts";
import crypto from "crypto";
import bcrypt from "bcrypt";

import IdModel from "../model/id.ts";
import Mailer from "../config/mail.ts";
import type { propriety } from "../global/types.ts";

const register = wrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const {
      username,
      email,
      password,
    }: {
      username: propriety;
      email: propriety;
      password: propriety;
    } = req.body;

    const salt: number = 10;
    const hashedPassword: Promise<string> | void = await bcrypt.hash(password, salt);

    const code: number = crypto.randomInt(100000, 999999);
    const expiry: Date = new Date(Date.now() + 10 * 60 * 1000);

    const user = {
      username: username?.trim(),
      email: email?.toLowerCase(),
      password: hashedPassword,
      verificationCode: code,
      verificationExpiry: expiry,
    };

    const newUser = new IdModel(user);

    await newUser.save();

    const mailer: Mailer = new Mailer();
    await mailer.sendVerificationMail(email !== undefined ? email : "", code);

    return res.status(201).json({
      status: 201,
      message: "New verification code sent to email",
    });
  },
);

export { register };
