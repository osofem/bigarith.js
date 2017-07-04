# valueOf()
`valueOf()` returns the value of the BigArith object as a number.

#### Syntax
##### method function
```javascript
ba.valueOf();
```
 
### Parameters
#### method function
*none*

### Return value
#### method function - {number}
Returns the value of the BigArith object as a number.

### Description
If the value of the BigArith object evaluate to NaN, NaN is returned.

> NOTE: Use this function with caution as JavaScript numbers looses precision once it is greater than Number.MAX_SAFE_INTEGER or lesser than Number.MIN_SAFE_INTEGER and becomes "Infinity" when it is greater than Number.MAX_VALUE and "-Infinity" when it is less than Number.MIN_VALUE.

### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function
```javascript
var ba = new BigArith(1000);
console.log(ba.valueOf()); //logs 1000 to console

ba = new BigArith(1e3);
console.log(ba.valueOf()); //logs 1000 to console

ba = new BigArith("1000");
console.log(ba.valueOf()); //logs 1000 to console 

ba = new BigArith("one thousand");
console.log(ba.valueOf()); //logs 1000 to console

ba = new BigArith("-1002.789");
console.log(ba.valueOf()); //logs -1002.789 to console

ba = new BigArith();
console.log(ba.valueOf()); //logs 0 to console

ba = new BigArith("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
console.log(ba.valueOf()); //logs Infinity to console

ba = new BigArith(NaN);
console.log(ba.valueOf()); //logs NaN to console 
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [toFixed()](https://osofem.github.io/bigarith.js/documentation/tofixed.html)
* [toWords()](https://osofem.github.io/bigarith.js/documentation/towords.html)
* [toString()](https://osofem.github.io/bigarith.js/documentation/tostring.html)