"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRouter = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const roomController_1 = require("../controllers/roomController");
const roomController_2 = require("../controllers/roomController");
const router = express_1.default.Router();
router.post("/room", middleware_1.middleware, roomController_1.room);
router.get("/room/bulk", middleware_1.middleware, roomController_2.bulk);
router.get("/room/data", roomController_2.getData);
router.get("/room/:slug", middleware_1.middleware, roomController_1.roomSlug);
exports.roomRouter = router;
