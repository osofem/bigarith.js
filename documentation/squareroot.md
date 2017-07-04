# squareRoot() [UNSTABLE]

> This function is still unstable and in the developmental stage. It takes about `16,309` milliseconds to compute squareroot 2 to two hundred decimal places on a Windows 8 with 2GB RAM, 1.8GHz processor (Google Chrome 58.0.3029.81). Additionally, it does not work with very large numbers _yet!_.

`squareRoot()` returns the square root of a number. This has only a method function.

#### Syntax
##### method function
```javascript
ba.squareRoot();
```
 
### Parameters
#### method function
*none*

### Return value
#### method function - {BigArith}
A BigArith object with its value equals to the square root of the value of the BigArith object it is called on *to 200 decimal place when necessary*.

### Description
There is no static method function for `squareRoot()` so it should ALWAYS be used as a member function.  

Negative number returns NaN.


### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function
```javascript
var ba = new BigArith("2");
ba = ba.squareRoot(); //BigArith object with value "1.41421356237309504880168872420969807856967187537694807317667973799073247846210703885038753432764157273501384623091229702492483605585073721264412149709993583141322266592750559275579995050115278206057147"

ba = new BigArith("0.5");
ba = ba.squareRoot(); //BigArith object with value "0.70710678118654752440084436210484903928483593768847403658833986899536623923105351942519376716382078636750692311545614851246241802792536860632206074854996791570661133296375279637789997525057639103028574"

ba = new BigArith("4");
ba = ba.squareRoot(); //BigArith object with value "2"

ba = new BigArith("-3");
ba = ba.squareRoot(); //NaN
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
* [square()](https://osofem.github.io/bigarith.js/documentation/square.html)