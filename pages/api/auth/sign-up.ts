import type { NextApiRequest, NextApiResponse } from "next";
import * as argon2 from "argon2";
import prisma from "../../../lib/prisma";

type User = {
  id: number;
  email: string;
};

type Error = {
  message: string;
};

type Data = {
  user: User | null;
  error: Error | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password: body_password, confirm_password } = req.body;

  if (body_password !== confirm_password) {
    return res.status(409).json({
      user: null,
      error: {
        message: "passwords must match",
      },
    });
  }

  const hash = await argon2.hash(body_password, {
    hashLength: 12,
  });

  const result = await prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });
  const { password, ...user } = result;

  res.status(200).json({
    user,
    error: null,
  });
}
