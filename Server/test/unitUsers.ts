import "mocha";

import * as express from "express";

import * as sinon from "sinon";

import { userClass } from "../controller/users";

import { expect } from "chai";

const myObj = new userClass();

describe("user Controller _test", () => {
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
