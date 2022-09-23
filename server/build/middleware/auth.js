"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const isCustomAuth = token && token.length < 500;
        if (token && isCustomAuth) {
            let decodedData = jsonwebtoken_1.default.verify(token, 'test');
            req.userId = decodedData === null || decodedData === void 0 ? void 0 : decodedData.id;
        }
        else {
            let decodedData = jsonwebtoken_1.default.decode(token);
            req.userId = decodedData === null || decodedData === void 0 ? void 0 : decodedData.sub;
        }
        next();
    }
    catch (err) {
        console.log(err);
    }
});
exports.auth = auth;
//# sourceMappingURL=auth.js.map