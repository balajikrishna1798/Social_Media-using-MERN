import "mocha";

import * as sinon from "sinon";

import { postClass } from "../controller/posts";

import { expect } from "chai";

const myObj = new postClass();

describe("post Controller _test", () => {
  const req: any = {
    body: {},

    params: {},

    headers: {},
  };

  const res: any = {
    json: sinon.spy(),

    status: sinon.stub().returns({ end: sinon.spy() }),
  };

  const next = () => {};
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
