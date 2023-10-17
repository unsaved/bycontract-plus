import { validate } from "../bycontractOverride.js";
import { strict as assert } from 'assert';

describe("bycontract 'int' added type", () => {
    it("things not an int", () => {
        assert.throws(() => { validate("string", "int"); }, TypeError);
    });
    it("things are an int", () => {
        validate(0, "int");
    });
});
