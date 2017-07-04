# truncate()
`truncate()` returns the integer part of a number by removing the fractional part. There is a method function and a static method function.

#### Syntax
##### method function
```javascript
ba.truncate();
```

##### static method function
```javascript
BigArith.truncate(n);
```
 
### Parameters
#### method function
*none*

#### static method function
##### n - Required - {string|number|BigArith}
The number to truncate. This could be a string of digits, a number, or a BigArith object.

### Return value
#### method function - {BigArith}
A BigArith object with its value equals to the integer part of the value of the BigArith object it is called on.

#### static method function - {BigArith}
A BigArith object with its value equals to the integer part of parameter n.

### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes no parameter and returns a BigArith object with its value equals to the integer part of the value of the BigArith object it is called on.

The static method function takes one parameter (n) and is always used as `BigArith.truncate()`. It returns a BigArith object with its value equals to the integer part of parameter n.

Unlike ceil(), floor(), and round(), truncate() does not do any rounding on the number. It just remove the fractional part and return the integer remaining.

> Any number parameter (that is not strings of digits or a BigArith) should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.


### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function
```javascript
var ba = new BigArith("-45.456");
ba = ba.truncate(); //BigArith object with value "-45"

ba = new BigArith("-45.5");
ba = ba.truncate(); //BigArith object with value "-45"

ba = new BigArith("0.4");
ba = ba.truncate(); //BigArith object with value "0"

ba = new BigArith("0.5");
ba = ba.truncate(); //BigArith object with value "0"
```

#### Using the static method function
```javascript
var ba = BigArith.truncate("-45.456"); //BigArith object with value "-45"
ba = BigArith.truncate("-45.5"); //BigArith object with value "-45"
ba = BigArith.truncate("0.4"); //BigArith object with value "0"
ba = BigArith.truncate("0.5"); //BigArith object with value "0"
```

#### Method chaining
Since the method returns a BigArith object, [method chaining](method_chaining.html) is possible.
```javascript
var ba = new BigArith("-17031986");
ba = ba.divide("+17031986").add("24011985").multiply("456785564").subtract("2"); //BigArith object with value "10968327654198974"
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [abs()](https://osofem.github.io/bigarith.js/documentation/abs.html)
* [ceil()](https://osofem.github.io/bigarith.js/documentation/ceil.html)
* [floor()](https://osofem.github.io/bigarith.js/documentation/floor.html)
* [negate()](https://osofem.github.io/bigarith.js/documentation/negate.html)
* [round()](https://osofem.github.io/bigarith.js/documentation/round.html)