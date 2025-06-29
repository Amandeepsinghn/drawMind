import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

export const chats = async (req: Request<{ roomId: string }>, res: Response) => {
  const roomId = parseInt(req.params.roomId);

  const messages = await prismaClient.chat.findMany({
    where: {
      // @ts-ignore
      roomId: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 100,
  });

  res.status(200).json({
    messages,
  });
};
