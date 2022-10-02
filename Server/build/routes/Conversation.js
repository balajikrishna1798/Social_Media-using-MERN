"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Conversation_1 = require("../controller/Conversation");
const Conversation = new Conversation_1.conversationClass();
const router = express_1.default.Router();
router.post('/', Conversation.Conversation);
router.get('/:userId', Conversation.userId);
router.get('/find/:firstUserId/:secondUserId', Conversation.findUserId);
exports.default = router;
//# sourceMappingURL=Conversation.js.map