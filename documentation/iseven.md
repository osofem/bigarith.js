# isEven()
<code>isEven()</code> returns a boolean indicating wheather a number is exactly divisible by 2 or not. There is ONLY a method function for this.

#### Syntax
##### method function
```javascript
ba.isEven();
```
 
### Parameters
#### method function
*none*

### Return value
#### method function - {boolean}
Returns true if the value of the BigArith object it is called on is exactly divisible by 2 and false otherwise.

##### Description
There is no static method function for `isEven()` so it should ALWAYS be used as a member function.


### Examples

> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` and every other thing remains the same in both server-side and client-side code.

#### Using method function

```javascript
var ba = new BigArith("-17031986");
console.log(ba = ba.isEven()); //logs true to the console

ba = new BigArith("+17031986");
console.log(ba = ba.isEven()); //logs true to the console

ba = new BigArith("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
console.log(ba = ba.isEven()); //logs false to the console

ba = new BigArith("2.4");
console.log(ba = ba.isEven()); //logs false to the console

ba = new BigArith("0");
console.log(ba = ba.isEven()); //logs true to the console 

ba = new BigArith();
console.log(ba = ba.isEven()); //logs true to the console 

ba = new BigArith(null);
console.log(ba = ba.isEven()); //logs true to the console 

ba = new BigArith(NaN);
console.log(ba = ba.isEven()); //logs NaN to the console 
```

More examples [here](https://github.com/osofem/BigArith.js/tree/master/examples/)

### See also
* [isOdd()](https://osofem.github.io/BigArith.js/documentation/isodd.html)
* [isPositive()](https://osofem.github.io/BigArith.js/documentation/ispositive.html)
* [isNegative()](https://osofem.github.io/BigArith.js/documentation/isnegative.html)