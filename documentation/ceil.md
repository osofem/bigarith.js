# ceil()
<code>ceil()</code> returns the smallest integer greater than or equal to a given number. There is a method function and a static method function.

#### Syntax
##### method function
```javascript
ba.ceil();
```

##### static method function
```javascript
BigArith.ceil(n);
```
 
### Parameters
#### method function
*none*

#### static method function
##### n - Required - {string|number|BigArith}
The number to ceil. This could be a string of digits, a number, or a BigArith object.

### Return value
#### method function - {BigArith}
A BigArith object with its value equals to the <code>ceil</code>ed value of the BigArith object it is called on.

#### static method function - {BigArith}
A BigArith object with its value equals to the <code>ceil</code>'ed value of n.

##### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes no parameter and returns a BigArith whose value equals the smallest integer greater than or equal to that of the BigArith object it is called on.

The static method function takes one parameter (n) and is always used as <code>BigArith.ceil()</code>. It returns the smallest integer greater than or equal to n. 

> Any number parameter (that is not strings of digits or a BigArith), it should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.


### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` and every other thing remains the same in both server-side and client-side code.

#### Using method function

```javascript
var ba = new BigArith("-17031986.001");
ba = ba.ceil(); //BigArith object with value "-17031986"

ba = new BigArith("+17031986.001");
ba = ba.ceil(); //BigArith object with value "17031987"

ba = new BigArith("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999.999");
ba = ba.ceil(); //BigArith object with value "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"

ba = new BigArith();
ba = ba.ceil(); //BigArith object with value "0" 

ba = new BigArith(null);
ba = ba.ceil(); //BigArith object with value "0" 

ba = new BigArith(NaN);
ba = ba.ceil(); //NaN
```

#### Using the static method function

```javascript
var ba = BigArith.ceil("-17031986.001"); //BigArith object with value "-17031986"
ba = BigArith.ceil("+17031986.001"); //BigArith object with value "17031987"
ba = BigArith.ceil("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999.999"); //BigArith object with value "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
ba = BigArith.ceil(); //BigArith object with value "0"
ba = BigArith.ceil(null); //BigArith object with value "0"
ba = BigArith.ceil(NaN); //NaN
```

More examples [here](https://github.com/osofem/BigArith.js/tree/master/examples/)

### See also
* [abs()](https://osofem.github.io/BigArith.js/documentation/abs.html)
* [floor()](https://osofem.github.io/BigArith.js/documentation/floor.html)
* [round()](https://osofem.github.io/BigArith.js/documentation/round.html)
* [isNegative()](https://osofem.github.io/BigArith.js/documentation/isnegative.html)
* [isPositive()](https://osofem.github.io/BigArith.js/documentation/ispositive.html)
* [truncate()](https://osofem.github.io/BigArith.js/documentation/truncate.html)
* [negate()](https://osofem.github.io/BigArith.js/documentation/negate.html)