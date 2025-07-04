import express, { Router } from "express";
import { middleware } from "../middleware";
import { chatDelete, chats } from "../controllers/chatControllers";

const router = express.Router();

router.get("/chat/:roomId", middleware, chats);
router.post("/deleteChat", middleware, chatDelete);

export const chatRouter: Router = router;
