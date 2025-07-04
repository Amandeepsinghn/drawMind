import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user";
import { roomRouter } from "./routes/room";
import { chatRouter } from "./routes/chat";
const app = express();

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

app.use(cors());
app.use(express.json());

app.use("/api", chatRouter);
app.use("/api", roomRouter);
app.use("/api", userRouter);

app.listen(3004);
