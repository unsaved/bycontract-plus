const util = require("util");
const byContract = require("bycontract");
module.exports.validate = blaineValidate;
module.exports.Exception = byContract.Exception;
module.exports.is = byContract.is;

byContract.is.int = (val) => { return Number.isInteger(val); };
byContract.is.date = (val) => {
    return val !== null && typeof(val) === "object" && (val instanceof Date);
};
byContract.is.posint = (val) => { return Number.isInteger(val) && val > 0; };
byContract.is.nonnegint = (val) => {
    return Number.isInteger(val) && val >= 0;
};
byContract.is.posnum = (val) => { return Number.isNumber(val) && val > 0; };
byContract.is.isotimestr = (val)=> {
    return typeof(val) === "string" &&
      /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d$/.test(val);
};
class DoccedValError extends byContract.Exception {
    constructor() {
        const argArray = Array.prototype.slice.call(arguments);
        super(argArray.shift(), util.format.apply(null, argArray));
        this.name = "DoccedValError";
    }
}
module.exports.DoccedValError = DoccedValError;

/**
 * Call like either:
 *   blaineValidat(vals, contracts, doEnforceArgsLength, [messageParams....]
 * OR
 *   blaineValidat(vals, contracts, [messageParams....]
 *   This uses default doEnforceArgsLength behavior (true).
 */
function blaineValidate() {
//function blaineValidate(vals, contracts, doEnforceArgsLength, failMsg) {
    const argsArray = Array.prototype.slice.call(arguments);
    if (argsArray.length < 2)
        throw new Error(".validate called with " + argsArray.length
          + " params, but requires at least a candidate value + contract");
    let doEnforceArgsLength = false, failMsg;
    if (argsArray.length > 2 && typeof(argsArray[2]) === "boolean") {
        doEnforceArgsLength = argsArray[2];
        argsArray.splice(2, 1);
    }
    if (argsArray.length > 2)
        failMsg = util.format.apply(
          null, argsArray.splice(2, argsArray.length - 2));
    // Imperfect test that 1st parameter is an 'arguments'.
    // Can't use arguments.callee in 'use strict' mode.
    if (doEnforceArgsLength && arguments[1] instanceof Array
      && typeof(arguments[0]) === "object" && arguments[0] !== null
      && ("length" in arguments[0])
      && arguments[0].length > arguments[1].length)
        throw new DoccedValError("ETOOMANYARGS",
          (failMsg === undefined ? "" : (failMsg + "\n"))
          + "Called with "
          + arguments[0].length + " arguments but at most "
          + arguments[1].length + " are supported");
    if (failMsg === undefined)
        return byContract.validate.apply(null, argsArray);
    try {
        return byContract.validate.apply(null, argsArray);
    } catch (e0) {
        if (typeof(e0) !== "object" || !("name" in e0)
          || e0.name !== "ByContractError") throw e0;
        throw new DoccedValError(
          e0.code, failMsg + "\n" + e0.message);
    }
}
