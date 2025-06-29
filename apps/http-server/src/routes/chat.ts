import express, { Router } from "express";
import { middleware } from "../middleware";
import { chats } from "../controllers/chatControllers";

const router = express.Router();

router.get("/chat/:roomId", middleware, chats);

export const chatRouter: Router = router;
