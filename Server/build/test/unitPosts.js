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
const posts_1 = require("../controller/posts");
const myObj = new posts_1.postClass();
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
    it("createPosts", () => {
        const spy = sinon.spy(myObj, "createPosts");
        myObj.createPosts(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("commentPosts", () => {
        const spy = sinon.spy(myObj, "commentPosts");
        myObj.commentPosts(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("deletePosts", () => {
        const spy = sinon.spy(myObj, "deletePosts");
        myObj.deletePosts(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("getPost", () => {
        const spy = sinon.spy(myObj, "getPost");
        myObj.getPost(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("getPostByTag", () => {
        const spy = sinon.spy(myObj, "getPostByTag");
        myObj.getPostByTag(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("getPosts", () => {
        const spy = sinon.spy(myObj, "getPosts");
        myObj.getPosts(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("getPostsBySearch", () => {
        const spy = sinon.spy(myObj, "getPostsBySearch");
        myObj.getPostsBySearch(req, res, next);
        sinon.assert.calledOnce(spy);
    });
    it("getPostsByUser", () => {
        const spy = sinon.spy(myObj, "getPostsByUser");
        myObj.getPostsByUser(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("likePosts", () => {
        const spy = sinon.spy(myObj, "likePosts");
        myObj.likePosts(req, res);
        sinon.assert.calledOnce(spy);
    });
    it("updatePosts", () => {
        const spy = sinon.spy(myObj, "updatePosts");
        myObj.updatePosts(req, res, next);
        sinon.assert.calledOnce(spy);
    });
});
//# sourceMappingURL=unitPosts.js.map