# isNegative()
<code>isNegative()</code> returns a boolean indicating whether a number is less than zero or not. This have only a method function.

#### Syntax
##### method function
```javascript
ba.isNegative();
```
 
### Parameters
#### method function
*none*

### Return value
#### method function - {boolean}
Returns true if the value of the BigArith object it is called on is less than zero otherwise false.

### Description
There is no static method function for `isNegative()` so it should ALWAYS be used as a member function. 

If the value of the BigArith object evaluates to "-0", true is returned.


### Examples

> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function

```javascript
var ba = new BigArith("-17031986");
console.log(ba = ba.isNegative()); //logs true to the console

ba = new BigArith("+17031986");
console.log(ba = ba.isNegative()); //logs false to the console

ba = new BigArith("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
console.log(ba = ba.isNegative()); //logs false to the console

ba = new BigArith("2.4");
console.log(ba = ba.isNegative()); //logs false to the console

ba = new BigArith("0");
console.log(ba = ba.isNegative()); //logs false to the console 

ba = new BigArith("-0");
console.log(ba = ba.isNegative()); //logs true to the console 

ba = new BigArith();
console.log(ba = ba.isNegative()); //logs false to the console 

ba = new BigArith(null);
console.log(ba = ba.isNegative()); //logs false to the console 

ba = new BigArith(NaN);
console.log(ba = ba.isNegative()); //logs NaN to the console 
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [isOdd()](https://osofem.github.io/bigarith.js/documentation/isodd.html)
* [isPositive()](https://osofem.github.io/bigarith.js/documentation/ispositive.html)
* [isEven()](https://osofem.github.io/bigarith.js/documentation/iseven.html)