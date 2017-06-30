# max()
<code>max()</code> returns the largest of zero or more numbers. There is a method function and a static method function.

#### Syntax
##### method function
```javascript
ba.max([value1,[value2[,...]]]);
```

##### static method function
```javascript
BigArith.max([value1,[value2[,...]]]);
```
 
### Parameters
#### method function
##### value1, value2, ... - Optional - {string|number|BigArith}
The numbers to return the largest of (including the value of the BigArith object it is called on). This could be a string of digits, a number, or a BigArith object.

#### static method function
##### value1, value2, ... - Optional - {string|number|BigArith}
The numbers to return the largest of. This could be a string of digits, a number, or a BigArith object.

### Return value
#### method function - {BigArith}
A BigArith object with its value equals the largest of the given numbers and the value of the object it is called on. If at least one of the arguments cannot be converted to a number, NaN is returned.

#### static method function - {BigArith}
A BigArith object with its value equals the largest of the given numbers. If at least one of the arguments cannot be converted to a number, NaN is returned.

### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes zero or more parameters and returns the largest between the parameters and the value of the BigArith object it is called on. If no parameter is given, the value of the BigArith object is returned.

The static method function takes zero or more parameters and return the largest. If no parameter is given, zero is returned.

If at least one of the arguments cannot be converted to a number, NaN is returned.

> Any number parameter (that is not strings of digits or a BigArith) should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.

### Examples

> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function

```javascript
var ba = new BigArith("-17031986");
ba.max("4", 8); //BigArith object with value "8"

ba = new BigArith("+17031986");
ba.max(-2, -3, -10); //BigArith object with value "17031986"

ba = new BigArith("one");
ba.max("two"); //BigArith object with value "2"

ba = new BigArith("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
ba.max(); //BigArith object with value "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"

ba = new BigArith(-34);
ba.max("negative two", "-3.0", -987); //BigArith object with value "-2"

ba = new BigArith(-34);
ba.max("-2", NaN); // NaN
```

#### Using static method function
```javascript
BigArith.max("459", "-165.8987", "165.898700000000000000000", "200", "467"); //BigArith object with value "467"
BigArith.max("99", "0.123568123", "-0.03455893"); //BigArith object with value "99"
BigArith.max("45", "4590", "+0.03455893", "0.123568123"); //BigArith object with value "4590"
BigArith.max(); //BigArith object with value "0"

BigArith.max("4", NaN); // NaN
BigArith.max(NaN, "0.0467"); //NaN
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [min()](https://osofem.github.io/bigarith.js/documentation/min.html)