"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
    start: { type: Date },
    end: { type: Date },
    title: { type: String },
}, {
    timestamps: true
});
exports.Event = mongoose_1.default.model("Event", EventSchema);
//# sourceMappingURL=Event.js.map