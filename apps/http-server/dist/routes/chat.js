"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const chatControllers_1 = require("../controllers/chatControllers");
const router = express_1.default.Router();
router.get("/chat/:roomId", middleware_1.middleware, chatControllers_1.chats);
router.post("/deleteChat", middleware_1.middleware, chatControllers_1.chatDelete);
exports.chatRouter = router;
