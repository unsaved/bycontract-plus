# Description
node.js module for validating (primarily) function parameters.

This module provides a map that's the same as that provided by Dmitry Sheiko's
'bycontract' module, with the feature extensions described below.
I tried contracting Dmitry to get his direction on the best way to extend his
module, but he hasn't replied to me.  Not knowing if I will have to repeat
this extension work, I went with strategy that I can do most quickly and easily 
(but not necessarily best long-term)-- just make this new project that loads
the bycontract module and adds to it.

# Usage
Users will usually want to require/import the 'validate' and 'is' objects.
The first for performing validations, and the second to add custom
validator functions.

## Enhancements
1. The original 'validate' function requieres 2 and only 2 parameters.
I support some optional extra params.
1. For validate calls with first param arguments or an Array, I enforce
that the number of elements doesn't exceed that of the specified
enforcement contract (2nd parameter).
1. Test element count enforcement (#1 above) is not done if 3rd parameter
to validate call given as fase.
1. If the first non-boolean validate parameter after #2 is a string, then
it is a message to be used in validation Errors, overriding the default.
1. The message for previous feature can use util.format % placeholders and

I added the following validator functions, whose purpose should be obvious
from the names.
* int
* date
* posint
* nonnegint
* posnum
* isotimestr
* plainobject

Usage is same as for [bycontract](https://www.npmjs.com/package/bycontract) other than...
```javascript
const { validate, is } = require("bcontract-plus");

// Allow more than two arguments elements:
validate(arguments, ["string", "int"], false);

// In case of validation failure, use the specified Error message.
validate(var, "string", "%ith element in issue list not a string", i);
