"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const fileType = file.mimetype;
        if (fileType == "image/png" || fileType == "image/jpg" || fileType == "image/jpeg" || fileType == "image/webp") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb('Only .png, .jpg and .jpeg format allowed!');
        }
    }
});
exports.default = upload;
//# sourceMappingURL=Services.js.map