# floor()
<code>floor()</code> returns the largest integer less than or equal to a given number. There is a method function and a static method function.

#### Syntax
##### method function
```javascript
ba.floor();
```

##### static method function
```javascript
BigArith.floor(n);
```
 
### Parameters
#### method function
*none*

#### static method function
##### n - Required - {string|number|BigArith}
The number to floor. This could be a string of digits, a number, or a BigArith object.

### Return value
#### method function - {BigArith}
A BigArith object with its value equals to the <code>floor</code>ed value of the BigArith object it is called on.

#### static method function - {BigArith}
A BigArith object with its value equals to the <code>floor</code>ed value of n.

##### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes no parameter and returns a BigArith whose value equals the largest integer less than or equal to that of the BigArith object it is called on.

The static method function takes one parameter (n) and is always used as <code>BigArith.floor()</code>. It returns the largest integer less than or equal to n. 

> Any number parameter (that is not strings of digits or a BigArith) should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.


### Examples

> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function

```javascript
var ba = new BigArith("-17031986.001");
ba = ba.floor(); //BigArith object with value "-17031987"

ba = new BigArith("+17031986.001");
ba = ba.floor(); //BigArith object with value "17031986"

ba = new BigArith("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999.999");
ba = ba.floor(); //BigArith object with value "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"

ba = new BigArith();
ba = ba.floor(); //BigArith object with value "0" 

ba = new BigArith(null);
ba = ba.floor(); //BigArith object with value "0" 

ba = new BigArith(NaN);
ba = ba.floor(); //NaN
```

#### Using the static method function

```javascript
var ba = BigArith.floor("-17031986.001"); //BigArith object with value "-17031987"
ba = BigArith.floor("+17031986.001"); //BigArith object with value "17031986"
ba = BigArith.floor("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999.999"); //BigArith object with value "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"
ba = BigArith.floor(); //BigArith object with value "0"
ba = BigArith.floor(null); //BigArith object with value "0"
ba = BigArith.floor(NaN); //NaN
```

More examples [here](https://github.com/osofem/BigArith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/BigArith.js/tree/master/documentation)

### See also
* [abs()](https://osofem.github.io/BigArith.js/documentation/abs.html)
* [ceil()](https://osofem.github.io/BigArith.js/documentation/ceil.html)
* [round()](https://osofem.github.io/BigArith.js/documentation/round.html)
* [isNegative()](https://osofem.github.io/BigArith.js/documentation/isnegative.html)
* [isPositive()](https://osofem.github.io/BigArith.js/documentation/ispositive.html)
* [truncate()](https://osofem.github.io/BigArith.js/documentation/truncate.html)
* [negate()](https://osofem.github.io/BigArith.js/documentation/negate.html)