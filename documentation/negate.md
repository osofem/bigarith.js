# negate()
`negate()` changes the sign of a number. There is a method function and a static method function.

#### Syntax
##### method function
```javascript
ba.negate();
```

##### static method function
```javascript
BigArith.negate(n);
```

### Parameters
#### method function
*none*

#### static method function
##### n - Required - {string|number|BigArith}
The number to negate. It could be a string of digits, a number, or a BigArith object
	
### Return value
#### method function - {BigArith}
A BigArith object with its value equals to the value of the BigArith object it is called on with the sign changed.

##### static method function - {BigArith}
A BigArith object with its value equals to the value of n with it sign changed. 

### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes no parameter and returns the value of the BigArith object it is called on with the sign changed.

The static method function takes a parameter n and is always used as <code>BigArith.negate()</code>. It returns the value of n with the sign changed. 

A postive number is changed to it negative equivalent and a negative number changes to it positive equivalent.

> Any number parameter (that is not strings of digits or a BigArith) should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.

### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function
```javascript
var ba = new BigArith("-17031986");
ba = ba.negate(); //BigArith object with value "17031986"

ba = new BigArith("+17031986");
ba = ba.negate(); //BigArith object with value "-17031986"

a = new BigArith("17031986");
ba = ba.negate(); //BigArith object with value "-17031986"

ba = new BigArith(null);
ba = ba.negate(); //BigArith object with value "-0"

ba = new BigArith(0);
ba = ba.negate(); //BigArith object with value "-0"

ba = new BigArith("-0");
ba = ba.negate(); //BigArith object with value "0"

ba = new BigArith(NaN);
ba = ba.negate(); //NaN
```

#### Using the static method function
```javascript
var ba = BigArith.negate("-17031986"); //BigArith object with value "17031986"
ba = BigArith.negate("+17031986"); //BigArith object with value "-17031986"
ba = BigArith.negate("17031986"); //BigArith object with value "-17031986"
ba = BigArith.negate(null); //BigArith object with value "-0"
ba = BigArith.negate(); //BigArith object with value "-0"
ba = BigArith.negate("-0"); //BigArith object with value "0"
ba = BigArith.negate(NaN); //NaN
```

More examples [here](https://github.com/osofem/BigArith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/BigArith.js/tree/master/documentation)

### See also
* [ceil()](https://osofem.github.io/BigArith.js/documentation/ceil.html)
* [floor()](https://osofem.github.io/BigArith.js/documentation/floor.html)
* [round()](https://osofem.github.io/BigArith.js/documentation/round.html)
* [isNegative()](https://osofem.github.io/BigArith.js/documentation/isnegative.html)
* [isPositive()](https://osofem.github.io/BigArith.js/documentation/ispositive.html)
* [truncate()](https://osofem.github.io/BigArith.js/documentation/truncate.html)
* [abs()](https://osofem.github.io/BigArith.js/documentation/abs.html)