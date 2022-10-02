"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../routes/index"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const __variableOfChoice = path_1.default.resolve();
const app = (0, express_1.default)();
const port = 5000;
app.use('/uploads', express_1.default.static(path_1.default.join(__variableOfChoice, "uploads")));
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)());
app.use(index_1.default);
const URI = process.env.MONGODB_URL;
mongoose_1.default.connect(URI).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
});
//# sourceMappingURL=index.js.map