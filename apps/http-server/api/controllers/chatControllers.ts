import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

export const chats = async (req: Request<{ roomId: string }>, res: Response) => {
  const roomId = parseInt(req.params.roomId);

  const messages = await prismaClient.chat.findMany({
    where: {
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

interface ChatDeleteBody {
  roomId: string;
}

export const chatDelete = async (req: Request<{}, {}, ChatDeleteBody, { roomId: string }>, res: Response) => {
  const roomId = parseInt(req.body.roomId);

  const messages = await prismaClient.chat.deleteMany({
    where: {
      roomId: roomId,
    },
  });

  res.status(200).json({
    body: "deleted all data",
  });
};
