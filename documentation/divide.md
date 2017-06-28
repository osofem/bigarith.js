# divide()
<code>divide()</code> returns the quotient of the division of two numbers. There is a method function and a static method function.

#### Syntax
##### method function
```javascript
ba.divide(n);
```

##### static method function
```javascript
BigArith.divide(a, b);
```
 
### Parameters
#### method function
##### n - Required - {string|number|BigArith}
The divisor with the value of the BigArith object as the dividend. This could be a string of digits, a number, or a BigArith object.

#### static method function
##### a - Required - {string|number|BigArith}
The dividend: this could be a string of digits, a number, or a BigArith object.

##### b - Required - {string|number|BigArith}
The divisor: this could be a string of digits, a number, or a BigArith object.

### Return value
#### method function - {BigArith}
A BigArith object with its value equals to the quotient of the division of the value of the BigArith object it is called on (the dividend) and n (the divisor).

#### static method function - {BigArith}
A BigArith object with its value equals to the quotient of the division of a (the dividend) and b (the divisor).

##### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes one parameter (n) as the divisor and returns the quotient of the division of the value of the BigArith object it is called on and n.

The static method function takes two parameters (a, b) and is always used as <code>BigArith.divide()</code>. It returns the quotient of the division of a as the dividend and b as the divisor.

The quotient returned will be to maximum of 200 decimal places *when necessary*.

If n (in case of method function) or b (in case of static method function) is equivalent to zero, a <code>RangeError("Division by zero")</code> will be thrown.

> Any number parameter (that is not strings of digits or a BigArith), it should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.


### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` and every other thing remains the same in both server-side and client-side code.

#### Using method function

```javascript
var ba = new BigArith("-17031986");
ba = ba.divide("24011985"); //BigArith object with value "-0.70931187071789358522421199246959382991451977002317800881518125219551819643398911002151633861173909612220730605986968590893256013611536072507125087742641851558711201926871102076733764409731223803446487"

ba = new BigArith("4");
ba = ba.divide("0.5"); //BigArith object with value "8"

ba = new BigArith("8888888888888888888888888888888888888888888888888888888");
ba = ba.divide("99999999999999999999999999999999999999999999999999999999999999"); //BigArith object with value "0.00000008888888888888888888888888888888888888888888888888888888000000088888888888888888888888888888888888888888888888888888880000000888888888888888888888888888888888888888888888888888888800000008888889" 
```

#### Using the static method function

```javascript
var ba = BigArith.divide("-17031986", "24011985"); //BigArith object with value "-0.70931187071789358522421199246959382991451977002317800881518125219551819643398911002151633861173909612220730605986968590893256013611536072507125087742641851558711201926871102076733764409731223803446487"
ba = BigArith.divide("4", "0.5"); //BigArith object with value "8"
ba = BigArith.divide("8888888888888888888888888888888888888888888888888888888", "99999999999999999999999999999999999999999999999999999999999999"); //BigArith object with value "0.00000008888888888888888888888888888888888888888888888888888888000000088888888888888888888888888888888888888888888888888888880000000888888888888888888888888888888888888888888888888888888800000008888889"
```

#### Method chaining
Since the method returns a BigArith objects, [method chaining](method_chaining.html) is possible.
```javascript
var ba = new BigArith("-17031986");
ba = ba.divide("+17031986").add("24011985").multiply("456785564"); //BigArith object with value "10968327654198976"
```

More examples [here](https://github.com/osofem/BigArith.js/tree/master/examples/)

### See also
* [subtract()](https://osofem.github.io/BigArith.js/documentation/subtract.html)
* [multiply()](https://osofem.github.io/BigArith.js/documentation/multiply.html)
* [add()](https://osofem.github.io/BigArith.js/documentation/add.html)
* [modulus()](https://osofem.github.io/BigArith.js/documentation/modulus.html)