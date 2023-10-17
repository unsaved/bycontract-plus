import { validate } from "../bycontractOverride.js";
import { strict as assert } from 'assert';

describe("bycontract 'nonnegnum' added type", () => {
    it("things not an number", () => {
        assert.throws(() => { validate("string", "nonnegnum"); }, TypeError);
    });
    it("things not a non-negative number", () => {
        assert.throws(() => { validate(-3.14, "nonnegnum"); }, TypeError);
        assert.throws(() => { validate(-3.14, "nonnegnum"); }, TypeError);
    });
    it("things are a positive number", () => {
        validate(0, "nonnegnum");
        validate(3.14, "nonnegnum");
        validate(14, "nonnegnum");
    });
});
