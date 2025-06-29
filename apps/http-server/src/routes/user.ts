import express, { Router } from "express";
import { signUp, signIn } from "../controllers/longinController";
const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

export const userRouter: Router = router;
