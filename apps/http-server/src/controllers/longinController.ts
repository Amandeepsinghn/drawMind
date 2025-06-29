import express from "express";
import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import { createUserSchema, signinSchema } from "@repo/common/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/client";

export const signUp = async (req: Request, res: Response) => {
  const parsedData = createUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(500).json({
      body: "Incorrect inputs",
    });
    return;
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.username,
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });
    res.status(200).json({
      userId: user.id,
    });
  } catch (e) {
    res.status(411).json({
      body: "User already exists with this",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const parsedData = signinSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(500).json({
      body: "Incorrect inputs",
    });
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    res.status(403).json({
      message: "Not authorized",
    });
    return;
  }

  const token = jwt.sign({ userId: user?.id }, JWT_SECRET);

  res.status(200).json({
    token: token,
  });
};
