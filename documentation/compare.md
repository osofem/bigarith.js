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
#### method function
-1 if value of BigArith object is less to n, 0 if value of BigArith object is equal to n, 1 if value of BigArith object is greater than n

#### static method function
-1 if a is less to b, 0 if a is equal to b, 1 if a is greater than b.

##### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes one parameter (n) and returns an integer indicating whether value of object is lesser, equals or greater than n.

The static method function takes two parameters (a, b) and is always used as <code>BigArith.compare()</code>. It returns an integer indicating whether a is lesser, equals or greater than b. 

If the parameters are numbers, it should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.

* -1 : BigArith object value < n or a < b.
* 0 : BigArith object value == n or a == b.
* 1 : BigArith object value > n or a > b.

### Examples
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
```

#### Using the static method function

```javascript
console.log(BigArith.compare("-17031986", "24011985")); //logs -1
console.log(BigArith.compare("+17031986", "24011985")); //logs -1
console.log(BigArith.compare("8888888888888888888888888888888888888888888888888888888", "99999999999999999999999999999999999999999999999999999999999999")); //logs -1
console.log(BigArith.compare(null, "")); //logs 0
```

More examples [here](https://github.com/osofem/BigArith.js/tree/master/examples/)

### See also
* [compareAbs()](https://osofem.github.io/BigArith.js/documentation/compareabs.html)
* [min()](https://osofem.github.io/BigArith.js/documentation/min.html)
* [max()](https://osofem.github.io/BigArith.js/documentation/max.html)