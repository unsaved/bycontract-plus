# Description
node.js module for validating (primarily) function parameters.

## DEPRECATION:  

This module provides a map that's the same as that provided by Dmitry Sheiko's
'bycontract' module, with the feature extensions described below.
I tried contracting Dmitry to get his direction on the best way to extend his
module, but he hasn't replied to me.  Not knowing if I will have to repeat
this extension work, I went with strategy that I can do most quickly and easily 
(but not necessarily best long-term)-- just make this new project that loads
the bycontract module and adds to it.

# Installation
For ES6 or later environments
```bash
npm install @admc.com/bycontract-plus
```

For ES5 environments
```bash
npm install @admc.com/bycontract-plus@1.3
```

Disclosure: Node doc and usage indicates that if a module is ES6 then it must be loaded
via "import...from".  For example, attempting a require from an ES5 environment results in:
````
require() of ES Module <ES6_MODULE> from <ES5_SCRIPT> not supported.
````
Yet I see that some modules do somehow support both calling types, for example "yargs" since v16.
Documentation and web searches aren't finding how this is done.
If you know, please email me.
Until and if I figure that out, ES5 users must use the 1.x version of bycontract-plus.

# Usage
Users will usually want to import/require the 'validate' and 'is' objects.
The first for performing validations, and the second to add custom validator types.

For ES6 environment use bycontract-plus up to versions since 2.0.0:
```javascript
import { validate, is } from "@admc.com/bycontract-plus";
```

For bycontract-plus up to versions 1.3.x:
```javascript
const { validate, is } = require("@admc.com/bycontract-plus");
```

Validate function calls are the same as for [bycontract](https://www.npmjs.com/package/bycontract)
other than...

// Allow more than two arguments elements:
validate(arguments, ["string", "int"], false);

// In case of validation failure, use the specified Error message.
validate(var, "string", "%ith element in issue list not a string", i);

// In particular, the run "[]" no longer means "any" Array, it means
// precisely [], a 0-length array.
// To get the original bycontract behavior to test for any Array, use:
```javascript
validate(var, "", false);
validate(arguments, [""], false);
```

## Enhancements
1. The original 'validate' function requires 2 and only 2 parameters.
I support some optional extra params.
1. For validate calls where contract parameter (2nd) is an Array, I enforce
that the number of value elements doesn't exceed that of the specified
contract.
1. Test element count enforcement (previous item) is not done if 3rd parameter
to validate call given as fase.
1. If the first non-boolean validate parameter after #2 is a string, then
it is a message to be used in validation Errors, overriding the default.
1. The message for previous feature can use util.format % placeholders, with
format varargs parameters being all remaining parameters.

I added the following validator types.
I've added description for the ones where the type-name isn't intuitive.
* int
* date
* posint
* nonnegint  Non-negative integer
* posnum
* nonnegnum  Non-negative number
* isotimestr  Allows optional Z, +nn:nn, -nn:nn time zone suffix
* isotimestr_s  No time zone suffix
* plainobject
* strictdatestr  Format yyyy-mm-dd, where the segments must be 4 char + 2 char + 2 char
