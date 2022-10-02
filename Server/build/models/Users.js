"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    id: { type: String },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    pic: { type: String },
    password: { type: String, trim: true },
    googleId: { type: String },
    emailToken: { type: String },
    gender: { type: String },
    isVerified: Boolean,
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    mobileNumber: { type: String, default: "" }
}, {
    timestamps: true
});
exports.Users = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=Users.js.map