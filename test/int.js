const { validate } = require("../bycontractOverride");
const assert = require("node:assert/strict");

describe("bycontract 'int' added type", () => {
    it("things not an int", () => {
        assert.throws(() => { validate("string", "int"); }, TypeError);
    });
    it("things are an int", () => {
        validate(0, "int");
    });
});
