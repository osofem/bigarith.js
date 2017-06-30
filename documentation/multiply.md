# multiply()
<code>multiply()</code> returns the product of two numbers. There is a method function and a static method function.

#### Syntax
##### method function
```javascript
ba.multiply(n);
```

##### static method function
```javascript
BigArith.multiply(a, b);
```
 
### Parameters
#### method function
##### n - Required - {string|number|BigArith}
A multiplier with the value of the BigArith object it is called on as the multiplicand. This could be a string of digits, a number, or a BigArith object.

#### static method function
##### a - Required - {string|number|BigArith}
The multiplicand: this could be a string of digits, a number, or a BigArith object.

##### b - Required - {string|number|BigArith}
The multiplier: this could be a string of digits, a number, or a BigArith object.

### Return value
#### method function - {BigArith}
A BigArith object with its value equals to the product of n and the value of the BigArith object it is called on.

#### static method function - {BigArith}
A BigArith object with its value equals to the product of a and b.

### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes one parameter (n) and returns the product of the parameter and the value of the BigArith object it is called on.

The static method function takes two parameters (a, b) and is always used as <code>BigArith.multiply()</code>. It returns the product of a and b. 

> Any number parameter (that is not strings of digits or a BigArith) should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.


### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function

```javascript
var ba = new BigArith("-17031986");
ba = ba.multiply("24011985"); //BigArith object with value "-408971792352210"

ba = new BigArith(4);
ba = ba.multiply("0.5"); //BigArith object with value "2"

ba = new BigArith("0.00789");
ba = ba.multiply("0.065"); //BigArith object with value "0.00051285"

ba = new BigArith(Number.MAX_SAFE_INTEGER);
ba = ba.multiply("2401198599999999999999999999"); //BigArith object with value "21628074240405110951812599990992800745259009"

ba = new BigArith(Number.MAX_SAFE_INTEGER);
ba = ba.multiply(Number.MAX_SAFE_INTEGER); //BigArith object with value "81129638414606663681390495662081" 
```

#### Using the static method function

```javascript
var ba = BigArith.multiply("-17031986", "24011985"); //BigArith object with value "-408971792352210"
ba = BigArith.multiply("4", "0.5"); //BigArith object with value "2"
ba = BigArith.multiply(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER); //BigArith object with value "81129638414606663681390495662081"
```

#### Method chaining
Since the method returns a BigArith object, [method chaining](method_chaining.html) is possible.
```javascript
var ba = new BigArith("-17031986");
ba = ba.divide("+17031986").add("24011985").multiply("456785564").subtract("2"); //BigArith object with value "10968327654198974"
```
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [subtract()](https://osofem.github.io/bigarith.js/documentation/subtract.html)
* [add()](https://osofem.github.io/bigarith.js/documentation/add.html)
* [divide()](https://osofem.github.io/bigarith.js/documentation/divide.html)
* [modulus()](https://osofem.github.io/bigarith.js/documentation/modulus.html)