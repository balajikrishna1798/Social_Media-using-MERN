"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Message_1 = require("../controller/Message");
const router = express_1.default.Router();
router.post('/', Message_1.message);
router.get('/:conversationId', Message_1.conversationId);
exports.default = router;
//# sourceMappingURL=Message.js.map