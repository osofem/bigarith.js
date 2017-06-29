# modulus()
<code>modulus()</code> returns the reminder of division of two numbers. There is a method function and a static method function.

#### Syntax
##### method function
```javascript
ba.modulus(n);
```

##### static method function
```javascript
BigArith.modulus(a, b);
```
 
### Parameters
#### method function
##### n - Required - {string|number|BigArith}
The divisor with the value of the BigArith object it is called on as the dividend. This could be a string of digits, a number, or a BigArith object.

#### static method function
##### a - Required - {string|number|BigArith}
The dividend. This could be a string of digits, a number, or a BigArith object.

##### b - Required - {string|number|BigArith}
The divisor. This could be a string of digits, a number, or a BigArith object.

### Return value
#### method function - {BigArith}
The reminder of the division of the value of the BigArith object as the dividend and parameter n as the divisor. If the divisor (i.e. parameter `n`) is zero, NaN is returned.

#### static method function - {BigArith}
The reminder of the division of parameter `a` as the dividend and parameter `b` as the divisor. If the divisor (i.e. parameter `b`) is zero, NaN is returned.

##### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes one parameter and returns the reminder of the division of the value of the BigArith object and parameter `n`. If the divisor (i.e. parameter `n`) is zero, NaN is returned.

The static method function takes two parameters and returns the reminder of the division between parameter `a` and `b`. If the divisor (i.e. parameter `n`) is zero, NaN is returned.

If any of the divisor or the dividend evaluate to NaN, NaN is returned.

> Any number parameter (that is not strings of digits or a BigArith) should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.

### Examples

> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function
```javascript
var ba = new BigArith("-17031986");
ba.modulus("2"); //BigArith object with value "-0"

ba = new BigArith("+17031986");
ba.modulus(-2); //BigArith object with value "0"

ba = new BigArith("-17031986");
ba.modulus(-2); //BigArith object with value "-0"

ba = new BigArith("one");
ba.modulus("two"); //BigArith object with value "1"

ba = new BigArith("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
ba.modulus("888888888888888888888888888888888888"); //BigArith object with value "999"

ba = new BigArith(-34);
ba.modulus("negative two"); //BigArith object with value "-0"

ba = new BigArith(459);
ba.modulus("-165.8987"); //BigArith object with value "127.2026"

ba = new BigArith("0");
ba.modulus("8"); //BigArith object with value "0"

ba = new BigArith(459);
ba.modulus("0"); //NaN
```

#### Using static method function
```javascript
BigArith.modulus("459", "-165.8987"); //BigArith object with value "127.2026"
BigArith.modulus("99", "0.123568123"); //BigArith object with value "0.021933477"
BigArith.modulus("45", "4590"); //BigArith object with value "45"
BigArith.modulus("0", "8"); //BigArith object with value "0"
BigArith.modulus("8", "0"); //NaN
```

More examples [here](https://github.com/osofem/BigArith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/BigArith.js/tree/master/documentation)

### See also
* [subtract()](https://osofem.github.io/BigArith.js/documentation/subtract.html)
* [multiply()](https://osofem.github.io/BigArith.js/documentation/multiply.html)
* [divide()](https://osofem.github.io/BigArith.js/documentation/divide.html)
* [add()](https://osofem.github.io/BigArith.js/documentation/add.html)