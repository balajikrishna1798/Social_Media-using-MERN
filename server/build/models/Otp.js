"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OtpSchema = new mongoose_1.default.Schema({
    email: { type: String },
    code: { type: String },
    expiresIn: { type: Number },
}, {
    //@ts-expect-error
    timeStamps: { type: Boolean, default: true }
});
exports.Otp = mongoose_1.default.model("Otp", OtpSchema);
//# sourceMappingURL=Otp.js.map