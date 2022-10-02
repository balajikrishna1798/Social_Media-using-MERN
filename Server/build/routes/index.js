"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Posts_1 = __importDefault(require("./Posts"));
const Users_1 = __importDefault(require("./Users"));
const Message_1 = __importDefault(require("./Message"));
const Conversation_1 = __importDefault(require("./Conversation"));
const app = (0, express_1.default)();
app.use('/api/posts', Posts_1.default);
app.use('/api/users', Users_1.default);
app.use('/api/message', Message_1.default);
app.use('/api/conversation', Conversation_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map