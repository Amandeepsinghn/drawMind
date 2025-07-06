"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulk = exports.getData = exports.roomSlug = exports.room = void 0;
const client_1 = require("@repo/common/client");
const client_2 = require("@repo/db/client");
const room = async (req, res) => {
    try {
        const parsedData = client_1.createRoomSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(500).json({
                body: "Incorrect inputs",
            });
            return;
        }
        const userId = req.userId;
        const latestData = {
            slug: parsedData.data.name,
            adminId: userId,
        };
        const room = await client_2.prismaClient.room.create({
            data: latestData,
        });
        res.status(200).json({
            roomId: room.id,
        });
    }
    catch {
        res.status(411).json({
            body: "Room cannot be created",
        });
    }
};
exports.room = room;
const roomSlug = async (req, res) => {
    const slug = req.params.slug;
    const room = await client_2.prismaClient.room.findFirst({
        where: {
            slug: slug,
        },
    });
    res.status(200).json({
        room: room,
    });
};
exports.roomSlug = roomSlug;
const getData = async (req, res) => {
    const data = await client_2.prismaClient.room.findMany({
        select: {
            id: true,
            slug: true,
            createdAt: true,
        },
    });
    res.status(200).json(data.map((user) => ({
        roomName: user.slug,
        roomId: user.id,
        createdAt: user.createdAt,
    })));
};
exports.getData = getData;
const bulk = async (req, res) => {
    try {
        console.log("We are inside dataquery");
        const roomName = req.query.filter?.toString() || "";
        const data = await client_2.prismaClient.room.findMany({
            where: {
                OR: [{ slug: { contains: roomName, mode: "insensitive" } }],
            },
            select: {
                id: true,
                slug: true,
                createdAt: true,
            },
        });
        res.status(200).json(data.map((user) => ({
            roomName: user.slug,
            roomId: user.id,
            createdAt: user.createdAt,
        })));
    }
    catch {
        res.status(500).json({
            message: "something went wrong",
        });
    }
};
exports.bulk = bulk;
