"use strict";

const { format } = require("util");
const byContract = require("bycontract");
module.exports.Exception = byContract.Exception;
module.exports.is = byContract.is;
module.exports.validate = blaineValidate;

byContract.is.int = val => Number.isInteger(val);
byContract.is.date = val => val !== null && typeof val === "object" && val instanceof Date;
byContract.is.posint = val => Number.isInteger(val) && val > 0;
byContract.is.nonnegint = val => Number.isInteger(val) && val >= 0;
byContract.is.posnum = val => typeof val === "number" && !isNaN(val) && val > 0;
byContract.is.nonnegnum = val => typeof val === "number" && !isNaN(val) && val >= 0;
// This is of course just one format for date string.
// Including because it's very useful for development and scripting because it sorts
// in agreement with time order for all locations.
// Notice that we strictly require 2 characters for month and day-of-month numbers, like "02".
byContract.is.strictdatestr = v => typeof v === "string" && /^\d{4}-[01]\d-[0-3]\d$/.test(v);
byContract.is.isotimestr = val =>  // ISO 8601, zone of +/0 or Z optional
    typeof val === "string" &&
    /^\d{4}-[01]\d-[0-3]\dT[012]\d:[0-5]\d:[0-5]\d(?:[.]\d+)?(?:[+-]\d\d|[+-]\d\d?:\d\d|Z)?$/.test(val);
// This is ISO 8601 format to second resolution with no optional zone suffix.
byContract.is.isotimestr_s = val =>  // eslint-disable-line camelcase
    typeof val === "string" && /^\d{4}-[01]\d-[0-3]\dT[012]\d:[0-5]\d:[0-5]\d$/.test(val);
byContract.is.plainobject = val =>
    typeof val === "object" && val !== null &&
      Object.getPrototypeOf(val) === Object.getPrototypeOf({});
class DoccedValError extends byContract.Exception {
    constructor() {
        const argArray = Array.prototype.slice.call(arguments);
        super(argArray.shift(), format.apply(null, argArray));
        this.name = "DoccedValError";
    }
}
module.exports.DoccedValError = DoccedValError;

/**
 * Call like either:
 *   blaineValidate(vals, contracts, doEnforceArgsLength, [messageParams....]
 * OR
 *   blaineValidate(vals, contracts, [messageParams....]
 *
 * If doEnforceArgsLength true (the default behavior) and if contracts is
 * an Array then length of vals is enforced to be <= contract length.
 */
function blaineValidate() {
    const argsArray = Array.prototype.slice.call(arguments);
    if (argsArray.length < 2)  // eslint-disable-next-line prefer-template
        throw new Error(".validate called with " + argsArray.length
          + " params, but requires at least a candidate value + contract");
    let doEnforceArgsLength = true, failMsg;
    if (argsArray.length > 2 && typeof argsArray[2] === "boolean") {
        doEnforceArgsLength = argsArray[2];
        argsArray.splice(2, 1);
    }
    if (argsArray.length > 2)
        failMsg = format.apply(null, argsArray.splice(2, argsArray.length - 2));
    if (doEnforceArgsLength && arguments[1] instanceof Array
      && "length" in arguments[0] && arguments[0].length > arguments[1].length)
        throw new DoccedValError("ETOOMANYARGS",
          /* eslint-disable prefer-template */
          (failMsg === undefined ? "" : `${failMsg}\n`)
          + "Called with " + arguments[0].length + " arguments but at most "
          + arguments[1].length + " are supported");
          /* eslint-enable prefer-template */
    if (failMsg === undefined)
        return byContract.validate.apply(null, argsArray);
    try {
        return byContract.validate.apply(null, argsArray);
    } catch (e0) {
        if (typeof e0 !== "object" || !("name" in e0) || e0.name !== "ByContractError") throw e0;
        throw new DoccedValError(e0.code, `${failMsg}\n${e0.message}`);
    }
}
