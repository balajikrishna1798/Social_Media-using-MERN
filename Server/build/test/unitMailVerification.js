"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const sinon = __importStar(require("sinon"));
const MailVerification_1 = require("../controller/MailVerification");
const myObj = new MailVerification_1.verifyClass();
describe("post Controller _test", () => {
    const req = {
        body: {},
        params: {},
        headers: {},
    };
    const res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() }),
    };
    const next = () => { };
    it("emailVerified", () => {
        const spy = sinon.spy(myObj, "emailVerified");
        myObj.emailVerified(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("verifyPasswordMail", () => {
        const spy = sinon.spy(myObj, "verifyPasswordMail");
        myObj.verifyPasswordMail(req, res);
        sinon.assert.calledOnce(spy);
    });
});
//# sourceMappingURL=unitMailVerification.js.map