import "mocha";

import * as sinon from "sinon";

import { verifyClass } from "../controller/MailVerification";

const myObj = new verifyClass();

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
