"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pic: { type: String },
    password: { type: String },
    googleId: { type: String },
    emailToken: { type: String },
    id: { type: String },
    isVerified: Boolean
});
exports.Users = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=Users.js.map