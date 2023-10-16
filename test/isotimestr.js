const { validate } = require("../bycontractOverride");
const assert = require("node:assert/strict");

describe("bycontract 'isotimestr' added type", () => {
    it("things not a string", () => {
        assert.throws(() => { validate(4, "isotimestr"); }, TypeError);
        assert.throws(() => { validate(/re/, "isotimestr"); }, TypeError);
    });
    it("non-date strings", () => {
        assert.throws(() => { validate("helo", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("", "isotimestr"); }, TypeError);
    });
    it("invalid date components", () => {
        assert.throws(() => { validate("2021-22-13T23:24:25+04:00", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-12-43T23:24:25+04:00", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-2-13T23:24:25+04:00", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-12-3T23:24:25+04:00", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-22-13T23:24:25Z", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-12-43T23:24:25Z", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-2-13T23:24:25Z", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-12-3T23:24:25Z", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-22-13T23:24:25", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-12-43T23:24:25", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-2-13T23:24:25", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-12-3T23:24:2Z", "isotimestr"); }, TypeError);
    });
    it("missing date chars", () => {
        assert.throws(() => { validate("21-12-13T23:24:25+04:00", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-2-13T23:24:25+04:00", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-12-3T23:24:25+04:00", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("21-12-13T23:24:25Z", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-2-13T23:24:25Z", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-12-3T23:24:25Z", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("21-12-13T23:24:25", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-2-13T23:24:25", "isotimestr"); }, TypeError);
        assert.throws(() => { validate("2021-12-3T23:24:25", "isotimestr"); }, TypeError);
    });
    it("good date string, +/- zone", () => {
        validate("2021-12-13T23:24:25+04:00", "isotimestr");
        validate("2021-12-13T23:24:25-04:00", "isotimestr");
        validate("2021-12-13T23:24:25Z", "isotimestr");
        validate("2021-12-13T23:24:25Z", "isotimestr");
        validate("2021-12-13T23:24:25", "isotimestr");
        validate("2021-12-13T23:24:25", "isotimestr");
    });
    it("good date string, no zone", () => {
        validate("2021-12-13T23:24:25", "isotimestr");
    });
    it("good date string, Z zone", () => {
        validate("2021-12-13T23:24:25Z", "isotimestr");
    });
    it("good date string, +/- zone", () => {
        validate("2021-12-13T23:24:25+04:00", "isotimestr");
        validate("2021-12-13T23:24:25-04:00", "isotimestr");
    });
});
