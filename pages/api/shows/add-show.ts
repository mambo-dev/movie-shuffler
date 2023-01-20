// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Error } from "../auth/log-in";
import { Show } from "@prisma/client";

type Data = {
  data: null | Show;
  error: Error | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (!req.cookies.user) {
      return res.status(200).json({
        data: null,
        error: {
          message: "not logged in cannot add",
        },
      });
    }
    const user = JSON.parse(req.cookies.user);
    const show = req.body;
    console.log(user.id);
    const create_show = await prisma.show.create({
      data: {
        ...show,
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return res.status(200).json({
      data: create_show,
      error: null,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({
      data: null,
      error: {
        message: error.message,
      },
    });
  }
}
