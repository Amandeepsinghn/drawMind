"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatDelete = exports.chats = void 0;
const client_1 = require("@repo/db/client");
const chats = async (req, res) => {
    const roomId = parseInt(req.params.roomId);
    const messages = await client_1.prismaClient.chat.findMany({
        where: {
            roomId: roomId,
        },
        orderBy: {
            id: "desc",
        },
        take: 100,
    });
    res.status(200).json({
        messages,
    });
};
exports.chats = chats;
const chatDelete = async (req, res) => {
    const roomId = parseInt(req.body.roomId);
    const messages = await client_1.prismaClient.chat.deleteMany({
        where: {
            roomId: roomId,
        },
    });
    res.status(200).json({
        body: "deleted all data",
    });
};
exports.chatDelete = chatDelete;
