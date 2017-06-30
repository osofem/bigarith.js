# randomInt()
`randomInt()` returns a random integer between two specified numbers. This has only a static method function.

#### Syntax
##### static method function
```javascript
BigArith.randomInt(min, max);
```
 
### Parameters
#### static method function
##### min - Required - {string|number|BigArith}
The minimum number that can be returned (inclusive). This could be a string of digits, a number, or a BigArith object.

##### max - Required - {string|number|BigArith}
The maximum number that can be returned (exclusive). This could be a string of digits, a number, or a BigArith object.

### Return value
#### static method function - {BigArith}
A BigArith object with value equals to any number between min (inclusive) and max (exclusive).

### Description
There is no method function for `randomInt()` so it should ALWAYS be used as a static member function.

If the parameters are not integers, min is `floor`ed and max is `ceil`ed.

If the min parameter is higher than the max parameter, the returned integer will be between the max(inclusive) and min(exclusive).

If any of the parameters evaluate to NaN, NaN will be returned.


### Examples

> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function

```javascript
BigArith.randomInt("8888888888888888888888888888","9999999999999999999999999999999999999999999999999999"); //any number between "8888888888888888888888888888" (inclusive) and "9999999999999999999999999999999999999999999999999999" (exclusive)
BigArith.randomInt("1000", "1000"); //will always return 1000
BigArith.randomInt("5", "1"); //any number between 1(inclusive) and 5(exclusive)
BigArith.randomInt("1.9","2.1") //any number between 1(inclusive) and 3(exclusive)

BigArith.randomInt("2", NaN) //NaN
BigArith.randomInt(NaN, "99") //NaN
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [random()](https://osofem.github.io/bigarith.js/documentation/random.html)