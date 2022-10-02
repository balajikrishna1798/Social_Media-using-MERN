"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    userId: String,
    title: String,
    name: String,
    message: String,
    creator: String,
    tags: Array,
    selectedFile: String,
    likes: { type: Array, default: [] },
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: [{
            content: String,
            postedBy: { type: String, ref: "Users" }
        }]
});
exports.postMessage = mongoose_1.default.model("postMessage", postSchema);
//# sourceMappingURL=PostsMessage.js.map