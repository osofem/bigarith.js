# compare()
<code>compare()</code> compares two numbers. There is a method function and a static method function.

#### Syntax
##### method function
```javascript
ba.compare(n);
```

##### static method function
```javascript
BigArith.compare(a, b);
```
 
### Parameters
#### method function
##### n - Required - {string|number|BigArith}
The number to compare with the value of the BigArith object. This could be a string of digits, a number, or a BigArith object.

#### static method function
##### a - Required - {string|number|BigArith}
The number to compare to. This could be a string of digits, a number, or a BigArith object.

##### b - Required - {string|number|BigArith}
The number to compare with. This could be a string of digits, a number, or a BigArith object.

### Return value
#### method function - {integer}
<code>-1</code> if value of BigArith object is less than n, <code>0</code> if value of BigArith object is equal to n, <code>1</code> if value of BigArith object is greater than n

#### static method function - {integer}
<code>-1</code> if a is less than b, <code>0</code> if a is equal to b, <code>1</code> if a is greater than b.

### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes one parameter (n) and returns an integer indicating whether value of object is lesser, equals or greater than n.

The static method function takes two parameters (a, b) and is always used as <code>BigArith.compare()</code>. It returns an integer indicating whether a is lesser, equals or greater than b. 

> Any number parameter (that is not strings of digits or a BigArith) should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.

* <code>-1</code> : BigArith object value < n or a < b.
* <code>0</code> : BigArith object value == n or a == b.
* <code>1</code> : BigArith object value > n or a > b.

### Examples
> In the server-side, always remember to add the line `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side code.

#### Using method function

```javascript
var ba = new BigArith("-17031986");
console.log(ba.compare("24011985")); //logs -1

ba = new BigArith("+17031986");
console.log(ba.compare("24011985")); //logs -1

ba = new BigArith("+17031986");
console.log(ba.compare("17031986")); //logs 0

ba = new BigArith("+17031986");
console.log(ba.compare("99999999")); //logs 1

ba = new BigArith();
console.log(ba.compare(null)); //logs 0

ba = new BigArith("8888888888888888888888888888888888888888888888888888888");
console.log(ba.compare("99999999999999999999999999999999999999999999999999999999999999")); //logs -1

ba = new BigArith("23453434");
console.log(ba.compare(NaN)); //logs NaN
```

#### Using the static method function

```javascript
console.log(BigArith.compare("-17031986", "24011985")); //logs -1
console.log(BigArith.compare("+17031986", "24011985")); //logs -1
console.log(BigArith.compare("8888888888888888888888888888888888888888888888888888888", "99999999999999999999999999999999999999999999999999999999999999")); //logs -1
console.log(BigArith.compare(null, "")); //logs 0
console.log(BigArith.compare("23453434", NaN)); //logs NaN
```

More examples [here](https://github.com/osofem/bigarith.js/tree/master/examples/). Full documentation [here](https://github.com/osofem/bigarith.js/tree/master/documentation)

### See also
* [compareAbs()](https://osofem.github.io/bigarith.js/documentation/compareabs.html)
* [min()](https://osofem.github.io/bigarith.js/documentation/min.html)
* [max()](https://osofem.github.io/bigarith.js/documentation/max.html)