import { validate } from "../bcplus-es6.mjs";
import { strict as assert } from 'assert';

describe("bycontract 'posint' added type", () => {
    it("things not an number", () => {
        assert.throws(() => { validate("string", "posint"); }, TypeError);
    });
    it("things not an integer", () => {
        assert.throws(() => { validate(NaN, "posint"); }, TypeError);
        assert.throws(() => { validate(3.14, "posint"); }, TypeError);
    });
    it("things not a positive number", () => {
        assert.throws(() => { validate(-3.14, "posint"); }, TypeError);
    });
    it("things not a positive integer", () => {
        assert.throws(() => { validate(-3, "posint"); }, TypeError);
        assert.throws(() => { validate(0, "posint"); }, TypeError);
    });
    it("things are a positive integer", () => {
        validate(4, "posint");
        validate(4567, "posint");
    });
});
