"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const client_1 = require("@repo/db/client");
const client_2 = require("@repo/common/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_3 = require("@repo/backend-common/client");
const signUp = async (req, res) => {
    const parsedData = client_2.createUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(500).json({
            body: "Incorrect inputs",
        });
        return;
    }
    try {
        const user = await client_1.prismaClient.user.create({
            data: {
                email: parsedData.data.username,
                password: parsedData.data.password,
                name: parsedData.data.name,
            },
        });
        res.status(200).json({
            userId: user.id,
        });
    }
    catch (e) {
        res.status(411).json({
            body: "User already exists with this",
        });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    const parsedData = client_2.signinSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(500).json({
            body: "Incorrect inputs",
        });
        return;
    }
    const user = await client_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password,
        },
    });
    if (!user) {
        res.status(403).json({
            message: "Not authorized",
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: user?.id }, client_3.JWT_SECRET);
    res.status(200).json({
        token: token,
    });
};
exports.signIn = signIn;
