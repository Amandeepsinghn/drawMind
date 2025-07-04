import cors from "cors";
import { userRouter } from "./routes/user";
import { roomRouter } from "./routes/room";
import { chatRouter } from "./routes/chat";
import express, { Express } from "express";
const app: Express = express();

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "this is it my friend",
  });
});

app.use("/api", chatRouter);
app.use("/api", roomRouter);
app.use("/api", userRouter);

module.exports = app;
