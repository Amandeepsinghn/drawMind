import express, { Router } from "express";
import { middleware } from "../middleware";
import { room, roomSlug } from "../controllers/roomController";
import { bulk, getData } from "../controllers/roomController";

const router = express.Router();

router.post("/room", middleware, room);

router.get("/room/bulk", middleware, bulk);

router.get("/room/data", getData);

router.get("/room/:slug", middleware, roomSlug);

export const roomRouter: Router = router;
