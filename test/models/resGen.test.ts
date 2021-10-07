const chai = require("chai");
const expect = chai.expect;
import { resGen } from "../../src/models/resGen";

describe("testing set clase resGen.", function () {
  it("Test of instance", function () {
    const myResGen = new resGen();
    myResGen.valid = true;
    myResGen.message = "OPERATION_SUCCESFULL";
    expect(myResGen.valid).to.equal(true);
    expect(myResGen.message).to.equal("OPERATION_SUCCESFULL");
    expect(myResGen.message).to.be.a("string");
  });
});
