import { Request, Response } from "express";
import { createRoomSchema } from "@repo/common/client";
import { prismaClient } from "@repo/db/client";

type Data = {
  slug: string;
  adminId: string;
};

// body type for room creation
type CreateRoomBody = {
  name: string;
};

// request with userId injected
type AuthenticatedRequest<TBody = any, TParams = {}, TQuery = {}> = Request<TParams, {}, TBody, TQuery> & {
  userId: string;
};

// GET /room/:slug
type RoomSlugParams = { slug: string };

// GET /bulk?filter=abc
type BulkQuery = { filter?: string };

export const room = async (req: AuthenticatedRequest<CreateRoomBody>, res: Response) => {
  try {
    const parsedData = createRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(500).json({
        body: "Incorrect inputs",
      });
      return;
    }
    const userId = req.userId;

    const latestData: Data = {
      slug: parsedData.data.name,
      adminId: userId,
    };

    const room = await prismaClient.room.create({
      data: latestData,
    });

    res.status(200).json({
      roomId: room.id,
    });
  } catch {
    res.status(411).json({
      body: "Room cannot be created",
    });
  }
};

export const roomSlug = async (req: Request<RoomSlugParams>, res: Response) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug: slug,
    },
  });
  res.status(200).json({
    room: room,
  });
};

export const getData = async (req: Request, res: Response) => {
  const data = await prismaClient.room.findMany({
    select: {
      id: true,
      slug: true,
      createdAt: true,
    },
  });

  res.status(200).json(
    data.map((user: { id: number; slug: string; createdAt: Date }) => ({
      roomName: user.slug,
      roomId: user.id,
      createdAt: user.createdAt,
    }))
  );
};

export const bulk = async (req: Request<{}, {}, {}, BulkQuery>, res: Response) => {
  try {
    console.log("We are inside dataquery");
    const roomName = req.query.filter?.toString() || "";

    const data = await prismaClient.room.findMany({
      where: {
        OR: [{ slug: { contains: roomName, mode: "insensitive" } }],
      },
      select: {
        id: true,
        slug: true,
        createdAt: true,
      },
    });

    res.status(200).json(
      data.map((user: { id: number; slug: string; createdAt: Date }) => ({
        roomName: user.slug,
        roomId: user.id,
        createdAt: user.createdAt,
      }))
    );
  } catch {
    res.status(500).json({
      message: "something went wrong",
    });
  }
};
