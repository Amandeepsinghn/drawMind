"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = middleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@repo/backend-common/client");
function middleware(req, res, next) {
    const token = req.headers["authorization"] ?? "";
    const decoded = jsonwebtoken_1.default.verify(token, client_1.JWT_SECRET);
    if (typeof decoded === "object" && "userId" in decoded) {
        req.userId = decoded.userId;
        next();
    }
    else {
        res.status(403).json({
            message: "Unauthorized",
        });
    }
}
