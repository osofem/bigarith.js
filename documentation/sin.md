# sin() [UNSTABLE]

> This function is still unstable and in the developmental stage. It takes about `132,378` milliseconds (about 2 minutes) to compute sin 90&deg; (value that requires the highest computation time) to 200 decimal places on a Windows 8 with 2GB RAM, 1.8GHz processor (Google Chrome 58.0.3029.81).

`sin()` returns the sine of an angle (given in degrees). This has only a static method function.

#### Syntax
##### method function
```javascript
BigArith.sin(n);
```
 
### Parameters
#### static method function
##### n - Required - {string|number|BigArith}
The angle (given in degrees). This could be a string of digits, a number, or a BigArith object. 

### Return value
#### static method function - {BigArith}
A BigArith object with its value equals to the sine of the given angle.

### Description
There is no method function for `sin()` so it should ALWAYS be used as a static member function `BigArith.sin()`.

The returned result is the sine of the angle (given in degrees) to 200 decimal places. 


### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using static method function
```javascript
var ba = BigArith.sin("90"); //BigArith object with value "1"
ba = BigArith.sin("45"); //BigArith object with value "0.70710678118654752440084436210484903928483593768847403658833986899536623923105351942519376716382078636750692311545614851246241802792536860632206074854996791570661133296375279637789997525057639103028574"
ba = BigArith.sin("75.786"); //BigArith object with value "0.96938538105347861296416700717150229808535869562815803401956873118501223090061566869600592966355904235293676108201349860110150246533427896095023282383537025828106019960948476876965623570140419546374157"
ba = BigArith.sin("0"); //BigArith object with value "0"
```

#### Method chaining
Since the method returns a BigArith object, [method chaining](method_chaining.html) is possible.
```javascript
var ba = new BigArith("-17031986");
ba = ba.divide("+17031986").add("24011985").multiply("456785564").subtract("2"); //BigArith object with value "10968327654198974"
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [cos()](https://osofem.github.io/bigarith.js/documentation/cos.html)
* [tan()](https://osofem.github.io/bigarith.js/documentation/tan.html)