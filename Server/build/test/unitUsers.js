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
const users_1 = require("../controller/users");
const myObj = new users_1.userClass();
describe("user Controller _test", () => {
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
    it("signin", () => {
        const spy = sinon.spy(myObj, "signin");
        myObj.signin(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("signup", () => {
        const spy = sinon.spy(myObj, "signup");
        myObj.signup(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("changePassword", () => {
        const spy = sinon.spy(myObj, "changePassword");
        myObj.changePassword(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("GoogleSignIn", () => {
        const spy = sinon.spy(myObj, "GoogleSignIn");
        myObj.GoogleSignIn(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("follow", () => {
        const spy = sinon.spy(myObj, "follow");
        myObj.follow(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("unfollow", () => {
        const spy = sinon.spy(myObj, "unfollow");
        myObj.unfollow(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("getMyProfile", () => {
        const spy = sinon.spy(myObj, "getMyProfile");
        myObj.getMyProfile(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("getOthersPosts", () => {
        const spy = sinon.spy(myObj, "getOthersPosts");
        myObj.getOthersPosts(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("friends", () => {
        const spy = sinon.spy(myObj, "friends");
        myObj.friends(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("searchUsers", () => {
        const spy = sinon.spy(myObj, "searchUsers");
        myObj.searchUsers(req, res);
        sinon.assert.calledOnce(spy);
    });
});
//# sourceMappingURL=unitUsers.js.map