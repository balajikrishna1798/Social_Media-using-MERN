"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationClass = void 0;
const Conversation_1 = require("../models/Conversation");
class conversationClass {
    constructor() {
        this.Conversation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newConversation = new Conversation_1.conversation({
                members: [req.body.senderId, req.body.receiverId],
            });
            try {
                const savedConversation = yield newConversation.save();
                res.status(200).json(savedConversation);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        this.userId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const Conversation = yield Conversation_1.conversation.find({
                    members: { $in: [req.params.userId] },
                });
                res.status(200).json(Conversation);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        this.findUserId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const Conversation = yield Conversation_1.conversation.findOne({
                    members: { $all: [req.params.firstUserId, req.params.secondUserId] },
                });
                res.status(200).json(Conversation);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    }
}
exports.conversationClass = conversationClass;
//# sourceMappingURL=Conversation.js.map