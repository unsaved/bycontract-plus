const { format } = require("util");
const byContract = require("bycontract");
module.exports.Exception = byContract.Exception;
module.exports.is = byContract.is;

byContract.is.int = val => Number.isInteger(val);
byContract.is.date = val =>
    val !== null && typeof(val) === "object" && (val instanceof Date)
;
byContract.is.posint = val => Number.isInteger(val) && val > 0;
byContract.is.nonnegint = val => Number.isInteger(val) && val >= 0;
byContract.is.posnum = val => Number.isNumber(val) && val > 0;
byContract.is.isotimestr = val =>  // ISO 8601
    typeof(val) === "string" &&
    /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:[.]\d+)?(?:[+-]\d\d|[+-]\d\d?:\d\d)?Z?$/
      .test(val)
;
// This is ISO 8601 format to second resolution with no optional additions.
byContract.is.isotimestr_s = val =>  // eslint-disable-line camelcase
    typeof(val) === "string" &&
      /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d$/.test(val)
;
byContract.is.plainobject = val =>
    typeof(val) === "object" && val !== null &&
      Object.getPrototypeOf(val) === Object.getPrototypeOf({})
;
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
    if (argsArray.length < 2)
        throw new Error(".validate called with " + argsArray.length
          + " params, but requires at least a candidate value + contract");
    let doEnforceArgsLength = true, failMsg;
    if (argsArray.length > 2 && typeof(argsArray[2]) === "boolean") {
        doEnforceArgsLength = argsArray[2];
        argsArray.splice(2, 1);
    }
    if (argsArray.length > 2)
        failMsg = format.apply(null, argsArray.splice(2, argsArray.length - 2));
    if (doEnforceArgsLength && arguments[1] instanceof Array
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

module.exports.validate = blaineValidate;
