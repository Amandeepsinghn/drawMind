import express, { Router } from "express";
import { signUp, signIn } from "../controllers/longinController";
const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/test", (req, res) => {
  res.json({
    message: "deployed",
  });
});

export const userRouter: Router = router;
