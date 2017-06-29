# random()
<code>random()</code> returns a random number between 0 (inclusive) and 1 (exclusive). This have only a static method function.

#### Syntax
##### static method function
```javascript
BigArith.random();
```
 
### Parameters
#### static method function
*none*

### Return value
#### static method function - {string}
Returns any number between 0 (inclusive) and 1 (exclusive).

##### Description
There is no method function for `random()` so it should ALWAYS be used as a static member function.

The length of the mantissa part of the returned strings of digits can have a maximum of 200 digits.


### Examples

> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function

```javascript
console.log(BigArith.random()); //any number between 0 and 1 which a maximum of 200 decimal places
```

More examples [here](https://github.com/osofem/BigArith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/BigArith.js/tree/master/documentation)

### See also
* [randomInt()](https://osofem.github.io/BigArith.js/documentation/randomint.html)