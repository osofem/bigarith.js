# toFixed()
`toFixed()` returns a number formatted to a number of decimal places. There is a method function and a static method function.

#### Syntax
##### method function
```javascript
ba.toFixed([d]);
```

##### static method function
```javascript
BigArith.toFixed(n [, d]);
```
 
### Parameters
#### method function
##### d - Optional - {string|number|BigArith}
The number of digits to appear after the decimal point; this may be a value between `0` and `200` (both inclusive). If this is omitted, it is treated as 0. This could be a string of digits, a number, or a BigArith object.

#### static method function
##### n - Required - {string|number|BigArith}
The number format. This could be a string of digits, a number, or a BigArith object.

##### d - Optional - {string|number|BigArith}
The number of digits to appear after the decimal point; this may be a value between `0` and `200` (both inclusive). If this is omitted, it is treated as 0. This could be a string of digits, a number, or a BigArith object.

### Return value
#### method function - {string}
Returns the value of the BigArith object it is called on to parameter `d` decimal places rounded up or down when necessary as string of digits.

#### static method function - {string}
Returns parameter `n` to parameter `d` decimal places rounded up or down when necessary as string of digits.

### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes one parameter (d) and returns the value of the BigArith object it is called on to parameter `d` decimal places rounded up or down when necessary as string of digits. If any of the value of the BigArith object or parameter `d` evaluates to NaN, NaN is returned. 

The static method function takes two parameters (n, d) and is always used as `BigArith.toFixed()`. It returns parameter `n` to parameter `d` decimal places rounded up or down when necessary as string of digits. If any of the value of parameters `n` or `d` evaluates to NaN, NaN is returned.

If parameter `d` is not between 0 and 200 (both inclusive), a RangeError will be thrown.

> Any number parameter (that is not strings of digits or a BigArith) should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.

### Examples

> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function
```javascript
var ba = new BigArith("0.5");
console.log(ba.toFixed()); //logs "1" to console, notice it was rounded up

ba = new BigArith("0.45");
console.log(ba.toFixed()); //logs "0" to console, notice it was rounded down

ba = new BigArith("0.45");
console.log(ba.toFixed(9)); //logs "0.450000000" to console, notice padding with zero 

ba = new BigArith("-1.45");
console.log(ba.toFixed()); //logs "-1" to console

ba = new BigArith("-1.5");
console.log(ba.toFixed()); //logs "-2" to console

ba = new BigArith("1.45");
console.log(ba.toFixed(1)); //logs "1.5" to console 

ba = new BigArith("-1.45");
console.log(ba.toFixed(1)); //logs "-1.5" to console  

ba = new BigArith("-1.55");
console.log(ba.toFixed(0)); //logs "-2" to console  

ba = new BigArith("9");
console.log(ba.toFixed(new BigArith("5.9"))); //logs "9.00000" to console  

ba = new BigArith("9");
console.log(ba.toFixed(200)); //logs "9.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" to console 

ba = new BigArith(NaN);
console.log(ba.toFixed(200)); //NaN

ba = new BigArith(20);
console.log(ba.toFixed(NaN)); //NaN
```

#### Using static method function
```javascript
console.log(BigArith.toFixed("0.5")); //logs "1" to console, notice it was rounded up
console.log(BigArith.toFixed("0.45")); //logs "0" to console, notice it was rounded down
console.log(BigArith.toFixed("0.45", 9)); //logs "0.450000000" to console, notice padding with zero 
console.log(BigArith.toFixed("-1.45")); //logs "-1" to console
console.log(BigArith.toFixed("-1.5")); //logs "-2" to console
console.log(ba.toFixed("1.45", 1)); //logs "1.5" to console 
console.log(BigArith.toFixed("-1.45", 1)); //logs "-1.5" to console  
console.log(BigArith.toFixed("-1.55", 0)); //logs "-2" to console  
console.log(BigArith.toFixed("9", new BigArith("5.9"))); //logs "9.00000" to console 
console.log(BigArith.toFixed("9", 200)); //logs "9.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" to console 
console.log(BigArith.toFixed(NaN, 200)); //NaN
console.log(BigArith.toFixed(20, NaN)); //NaN
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [toString()](https://osofem.github.io/bigarith.js/documentation/tostring.html)