import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Error } from "../../auth/log-in";
import { Show, User_shows } from "@prisma/client";

type Data = {
  data: string | null;
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
          message: "not logged in cannot delete show",
        },
      });
    }
    const user = JSON.parse(req.cookies.user);

    //@ts-ignore
    const id = parseInt(req.query.sid);

    await prisma.user_shows.delete({
      where: {
        user_id_show_id: {
          user_id: user.id,
          show_id: id,
        },
      },
    });

    return res.status(200).json({
      data: "successfully deleted",
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
