const { validate } = require("../bcplus-es5.cjs");
const { strict: assert } = require("assert");

describe("bycontract 'strictdatestr' added type", () => {
    it("things not a string", () => {
        assert.throws(() => { validate(4, "strictdatestr"); }, TypeError);
        assert.throws(() => { validate(/re/, "strictdatestr"); }, TypeError);
    });
    it("non-date strings", () => {
        assert.throws(() => { validate("helo", "strictdatestr"); }, TypeError);
        assert.throws(() => { validate("", "strictdatestr"); }, TypeError);
    });
    it("invalid date components", () => {
        assert.throws(() => { validate("2021-22-13", "strictdatestr"); }, TypeError);
        assert.throws(() => { validate("2021-12-43", "strictdatestr"); }, TypeError);
        assert.throws(() => { validate("2021-2-13", "strictdatestr"); }, TypeError);
        assert.throws(() => { validate("2021-12-3", "strictdatestr"); }, TypeError);
    });
    it("invalid date components", () => {
        assert.throws(() => { validate("21-12-13", "strictdatestr"); }, TypeError);
        assert.throws(() => { validate("2021-2-13", "strictdatestr"); }, TypeError);
        assert.throws(() => { validate("2021-12-3", "strictdatestr"); }, TypeError);
    });
    it("good date string", () => {
        validate("2021-12-13", "strictdatestr");
    });
});
