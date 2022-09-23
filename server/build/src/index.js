"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Posts_1 = __importDefault(require("../routes/Posts"));
const Users_1 = __importDefault(require("../routes/Users"));
const Calender_1 = __importDefault(require("../routes/Calender"));
const path_1 = __importDefault(require("path"));
const __variableOfChoice = path_1.default.resolve();
const app = (0, express_1.default)();
const port = 5000;
app.use('/uploads', express_1.default.static(path_1.default.join(__variableOfChoice, "uploads")));
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)());
app.use('/posts', Posts_1.default);
app.use('/users', Users_1.default);
app.use('/api/calendar', Calender_1.default);
const URI = "mongodb+srv://Balaji:1234@cluster1.ux7bq.mongodb.net/Posts?retryWrites=true&w=majority";
mongoose_1.default.connect(URI).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
});
//# sourceMappingURL=index.js.map