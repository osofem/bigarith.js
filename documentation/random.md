# random()
`random()` returns a random number between 0 (inclusive) and 1 (exclusive). This has only a static method function.

#### Syntax
##### static method function
```javascript
BigArith.random();
```
 
### Parameters
#### static method function
*none*

### Return value
#### static method function - {BigArith}
A BigArith object with value equals to any number between 0 (inclusive) and 1 (exclusive).

### Description
There is no method function for `random()` so it should ALWAYS be used as a static member function.

The mantissa part of the returned strings of digits can have a maximum of 200 digits.


### Examples

> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using static method function

```javascript
BigArith.random(); //any number between 0(inclusive) and 1(exclusive) with a maximum of 200 decimal places
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [randomInt()](https://osofem.github.io/bigarith.js/documentation/randomint.html)