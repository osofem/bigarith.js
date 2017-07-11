# tan() [UNSTABLE]

> This function is still unstable and in the developmental stage. It takes about `computation time for sin + computation time for cos` milliseconds to compute tan &theta;&deg;.

`tan()` returns the tangent of an angle (given in degrees). This has only a static method function.

#### Syntax
##### method function
```javascript
BigArith.tan(n);
```
 
### Parameters
#### static method function
##### n - Required - {string|number|BigArith}
The angle (given in degrees). This could be a string of digits, a number, or a BigArith object. 

### Return value
#### static method function - {BigArith}
A BigArith object with its value equals to the tangent of the given angle.

### Description
There is no method function for `tan()` so it should ALWAYS be used as a static member function `BigArith.tan()`.

The returned result is the tangent of the angle (given in degress) to 200 decimal places. 


### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using static method function
```javascript
var ba = BigArith.tan("90"); //throws RangeError division by zero
ba = BigArith.tan("45"); //BigArith object with value "1"
ba = BigArith.tan("75.786"); //BigArith object with value "3.94790489515350670109117542623163534465501513035850512311134005400587295700520957954415702735900414306649942878453329557667461916716391291200669582397421401273759999395237647345675059387564486523393406"
ba = BigArith.tan("0"); //BigArith object with value "0"
```

#### Method chaining
Since the method returns a BigArith object, [method chaining](method_chaining.html) is possible.
```javascript
var ba = new BigArith("-17031986");
ba = ba.divide("+17031986").add("24011985").multiply("456785564").subtract("2"); //BigArith object with value "10968327654198974"
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [sin()](https://osofem.github.io/bigarith.js/documentation/sin.html)
* [cos()](https://osofem.github.io/bigarith.js/documentation/cos.html)