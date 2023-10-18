const { validate } = require("../bcplus-es5.cjs");
const { strict: assert } = require("assert");

describe("bycontract 'posnum' added type", () => {
    it("things not a number", () => {
        assert.throws(() => { validate("string", "posnum"); }, TypeError);
        assert.throws(() => { validate(/re/, "posnum"); }, TypeError);
    });
    it("things not a positive number", () => {
        assert.throws(() => { validate(-3.14, "posnum"); }, TypeError);
        assert.throws(() => { validate(-3, "posnum"); }, TypeError);
        assert.throws(() => { validate(0, "posnum"); }, TypeError);
    });
    it("things are a positive number", () => {
        validate(3, "posnum");
        validate(3.14, "posnum");
    });
});
