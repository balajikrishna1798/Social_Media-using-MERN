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
exports.conversationId = exports.message = void 0;
const Message_1 = require("../models/Message");
const message = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newMessage = new Message_1.messages(req.body);
    try {
        const savedMessage = yield newMessage.save();
        res.status(200).json(savedMessage);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.message = message;
//get
const conversationId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Messages = yield Message_1.messages.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(Messages);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.conversationId = conversationId;
//# sourceMappingURL=Message.js.map