"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calender_1 = require("../controller/calender");
const router = express_1.default.Router();
router.post("/createEvent", calender_1.createEvent);
router.get("/getEvent", calender_1.getEvent);
exports.default = router;
//# sourceMappingURL=Calender.js.map