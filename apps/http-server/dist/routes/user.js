"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const longinController_1 = require("../controllers/longinController");
const router = express_1.default.Router();
router.post("/signup", longinController_1.signUp);
router.post("/signin", longinController_1.signIn);
exports.userRouter = router;
