# subtract()
<code>subtract()</code> returns the difference of two numbers. There is a method function and a static method function.

#### Syntax
##### method function
```javascript
ba.subtract(n);
```

##### static method function
```javascript
BigArith.subtract(a, b);
```
 
### Parameters
#### method function
##### n - Required - {string|number|BigArith}
A subtrahend with the value of the BigArith object `add()` is called on as the minuend. This could be a string of digits, a number, or a BigArith object.

#### static method function
##### a - Required - {string|number|BigArith}
The Minuend: this could be a string of digits, a number, or a BigArith object.

##### b - Required - {string|number|BigArith}
The Subtrahend: this could be a string of digits, a number, or a BigArith object.

### Return value
#### method function - {BigArith}
A BigArith object with its value equals to the difference between the value of the BigArith object it is called on and n.

#### static method function - {BigArith}
A BigArith object with its value equals to the difference between a and b.

### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes one parameter (n) and returns the difference between the value of the BigArith object it is called on and the parameter.

The static method function takes two parameters (a, b) and is always used as `BigArith.subtract()`. It returns the difference between a and b. 

> Any number parameter (that is not strings of digits or a BigArith) should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.


### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function

```javascript
var ba = new BigArith("-17031986");
ba = ba.subtract("24011985"); //BigArith object with value "-41043971"

ba = new BigArith("+17031986");
ba = ba.subtract("24011985"); //BigArith object with value "-6979999"

ba = new BigArith("3");
ba = ba.subtract("2"); //BigArith object with value "1"

ba = new BigArith("-3");
ba = ba.subtract("2"); //BigArith object with value "-5"

ba = new BigArith("3");
ba = ba.subtract("-2"); //BigArith object with value "5"

ba = new BigArith("8888888888888888888888888888888888888888888888888888888");
ba = ba.subtract("99999999999999999999999999999999999999999999999999999999999999"); //BigArith object with value "-99999991111111111111111111111111111111111111111111111111111111" 

ba = new BigArith("3");
ba = ba.subtract(NaN); //NaN
```

#### Using the static method function
```javascript
var ba = BigArith.subtract("-17031986", "24011985"); //BigArith object with value "-41043971"
ba = BigArith.subtract("+17031986", "24011985"); //BigArith object with value "-6979999"
ba = BigArith.subtract("3", "2"); //BigArith object with value "1"
ba = BigArith.subtract("-3", "2"); //BigArith object with value "-5"
ba = BigArith.subtract("3", "-2"); //BigArith object with value "5"
ba = BigArith.subtract("8888888888888888888888888888888888888888888888888888888", "99999999999999999999999999999999999999999999999999999999999999"); //BigArith object with value "-99999991111111111111111111111111111111111111111111111111111111"
ba = BigArith.subtract("3", NaN); //NaN
```

#### Method chaining
Since the method returns a BigArith object, [method chaining](method_chaining.html) is possible.
```javascript
var ba = new BigArith("-17031986");
ba = ba.divide("+17031986").add("24011985").multiply("456785564").subtract("2"); //BigArith object with value "10968327654198974"
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [add()](https://osofem.github.io/bigarith.js/documentation/add.html)
* [multiply()](https://osofem.github.io/bigarith.js/documentation/multiply.html)
* [divide()](https://osofem.github.io/bigarith.js/documentation/divide.html)
* [modulus()](https://osofem.github.io/bigarith.js/documentation/modulus.html)