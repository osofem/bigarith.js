# square()
`square()` returns the square of a number. This has only a method function.

#### Syntax
##### method function
```javascript
ba.square();
```
 
### Parameters
#### method function
*none*

### Return value
#### method function - {BigArith}
A BigArith object with its value equals to the square of the value of the BigArith object it is called on.

### Description
There is no static method function for `square()` so it should ALWAYS be used as a member function.


### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function
```javascript
var ba = new BigArith("-45.456");
ba = ba.square(); //BigArith object with value "2066.247936"

ba = new BigArith("45.5");
ba = ba.square(); //BigArith object with value "2070.25"

ba = new BigArith("2");
ba = ba.square(); //BigArith object with value "4"

ba = new BigArith("3");
ba = ba.square(); //BigArith object with value "9"
```

#### Method chaining
Since the method returns a BigArith object, [method chaining](method_chaining.html) is possible.
```javascript
var ba = new BigArith("-17031986");
ba = ba.divide("+17031986").add("24011985").multiply("456785564").subtract("2"); //BigArith object with value "10968327654198974"
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [squareRoot()](https://osofem.github.io/bigarith.js/documentation/squareroot.html)