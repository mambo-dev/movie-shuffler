import type { NextApiRequest, NextApiResponse } from "next";
import * as argon2 from "argon2";
import prisma from "../../../lib/prisma";

type User = {
  id: number;
  email: string;
};

export type Error = {
  message: string;
};

type Data = {
  user: User | {} | null;
  error: Error | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password: body_password } = req.body;

  const find_user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!find_user) {
    return res.status(409).json({
      user: null,
      error: {
        message: "user not found try registering",
      },
    });
  }

  const verify_password = await argon2.verify(
    find_user?.password,
    body_password
  );

  if (!verify_password) {
    return res.status(409).json({
      user: null,
      error: {
        message: "invalid credentials",
      },
    });
  }

  const result = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      password: false,
      email: true,
      id: true,
    },
  });

  res.status(200).json({
    user: result,
    error: null,
  });
}
