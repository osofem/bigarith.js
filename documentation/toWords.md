# toWords()
`toWords()` returns the value of the BigArith object in English words using the [Short Scale](https://osofem.github.io/bigarith.js/documentation/short_scales.html) naming system.

#### Syntax
##### method function
```javascript
ba.toWords();
```
 
### Parameters
#### method function
*none*

### Return value
#### method function - {string}
Returns the value of the BigArith object in English words using the [Short Scale](https://osofem.github.io/bigarith.js/documentation/short_scales.html) naming system.

### Description
If the value of the BigArith object evaluate to NaN, NaN is returned.  

>This function has a limit of (&#177;1x10^1,005)-0.0000{insert 195 more zeroes}01 (i.e. nine hundred and ninety nine trecentretrigintillion point nine nine nine nine nine {insert 195 more "nine"'s}). 

That is 1,005 length of characteristic (parts before the decimal point) and 200 length of mantissa (parts after the decimal point). If the limit is exceeded, a RangeError is thrown.

### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function
```javascript
var ba = new BigArith(1000);
console.log(ba.toWords()); //logs "one thousand" to console

ba = new BigArith(1e3);
console.log(ba.toWords()); //logs "one thousand" to console

ba = new BigArith("1000");
console.log(ba.toWords()); //logs "one thousand" to console 

ba = new BigArith("one thousand");
console.log(ba.toWords()); //logs "one thousand" to console

ba = new BigArith("-1002.789");
console.log(ba.toWords()); //logs "negative one thousand two point seven eight nine" to console

ba = new BigArith();
console.log(ba.toWords()); //logs "zero" to console

ba = new BigArith(NaN);
console.log(ba.toWords()); //logs NaN to console 
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [toFixed()](https://osofem.github.io/bigarith.js/documentation/tofixed.html)
* [valueOf()](https://osofem.github.io/bigarith.js/documentation/valueof.html)
* [toString()](https://osofem.github.io/bigarith.js/documentation/tostring.html)