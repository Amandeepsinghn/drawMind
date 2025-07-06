"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./routes/user");
const room_1 = require("./routes/room");
const chat_1 = require("./routes/chat");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({
        message: "this is it my friend",
    });
});
app.use("/api", chat_1.chatRouter);
app.use("/api", room_1.roomRouter);
app.use("/api", user_1.userRouter);
app.listen(3004);
module.exports = app;
