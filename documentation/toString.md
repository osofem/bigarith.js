# toString()
`toString()` returns the value of the BigArith object as a string of digits.

#### Syntax
##### method function
```javascript
ba.toString();
```
 
### Parameters
#### method function
*none*

### Return value
#### method function - {string}
Returns the value of the BigArith object as a string of digits.

### Description
If the value of the BigArith object evaluate to NaN, NaN is returned.

### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function
```javascript
var ba = new BigArith(1000);
console.log(ba.toString()); //logs "1000" to console

ba = new BigArith(1e3);
console.log(ba.toString()); //logs "1000" to console

ba = new BigArith("1000");
console.log(ba.toString()); //logs "1000" to console 

ba = new BigArith("one thousand");
console.log(ba.toString()); //logs "1000" to console

ba = new BigArith();
console.log(ba.toString()); //logs "0" to console

ba = new BigArith(NaN);
console.log(ba.toString()); //logs NaN to console 
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [toFixed()](https://osofem.github.io/bigarith.js/documentation/tofixed.html)
* [valueOf()](https://osofem.github.io/bigarith.js/documentation/valueof.html)
* [toWords()](https://osofem.github.io/bigarith.js/documentation/towords.html)