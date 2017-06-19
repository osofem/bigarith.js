# abs()
<code>abs()</code> returns the absolute value of a number. There is a method function and a static method function.

#### Syntax
##### method function
```javascript
ba.abs();
```

##### static method function
```javascript
BigArith.abs(n);
```

### Parameters
#### method function
*none*

#### static method function
##### n - Required - {string|number|BigArith}
The number to find the absolute value of. It could be a string of digits, a number, or a BigArith object
	
### Return value
#### method function - {BigArith}
A BigArith object with its value equals to absolute value of the BigArith object it is called on.

##### static method function - {BigArith}
A BigArith object with its value equals to absolute value of n. 

### Description
There are two functions which could be used, the *method function*, and the *static method function*. The method function takes no parameter and returns the absolute value of the BigArith object it is called on.

The static method function takes a parameter n and is always used as <code>BigArith.abs()</code>. It returns the absolute value of n. 

If the parameter is a number, it should be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> limits.

### Examples
#### Using method function

```javascript
var ba = new BigArith("-17031986");
ba = ba.abs(); //BigArith object with value "17031986"

ba = new BigArith("+17031986");
ba = ba.abs(); //BigArith object with value "17031986"

ba = new BigArith(null);
ba = ba.abs(); //BigArith object with value "0" 
```

#### Using the static method function

```javascript
var ba = BigArith.abs("-17031986"); //BigArith object with value "17031986"
ba = BigArith.abs("+17031986"); //BigArith object with value "17031986"
ba = BigArith.abs(null); //BigArith object with value "0"
ba = BigArith.abs(); //BigArith object with value "0"
ba = BigArith.abs(NaN); //NaN
```

More examples [here](https://github.com/osofem/BigArith.js/tree/master/examples/)

### See also
* [ceil()](https://osofem.github.io/BigArith.js/documentation/ceil.html)
* [floor()](https://osofem.github.io/BigArith.js/documentation/floor.html)
* [round()](https://osofem.github.io/BigArith.js/documentation/round.html)
* [isNegative()](https://osofem.github.io/BigArith.js/documentation/isnegative.html)
* [isPositive()](https://osofem.github.io/BigArith.js/documentation/ispositive.html)
* [truncate()](https://osofem.github.io/BigArith.js/documentation/truncate.html)