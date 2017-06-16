# abs() method
The <code>abs()</code> method returns the absolute value of a number. There is a method function and a static method function.

#### Syntax
```javascript
ba.abs(); //method
//or
BigArith.abs(n); //static method
```

### Parameters
#### method
*none*

#### static method
##### n - {string|number|BigArith}
The number to find the absolute value of. It could be a string of digits, a number, or a BigArith object
	
### Return value
A BigArith object with it value set to the absolute value of the object abs() is called on.

### Description
There are two functions which could be used the method, and the static method. The method takes no parameter and returns the absolute value of the BigArith object it is called on.
The static method however takes a paramter n and is always used as <code>BigArith.abs()</code>. 

### Examples
#### Using method 

```javascript
var ba = new BigArith("-17031986");
ba.abs(); //BigArith object with value "17031986"

ba = new BigArith("+17031986");
ba.abs(); //BigArith object with value "17031986"

ba = new BigArith(null);
ba.abs(); //BigArith object with value "0" 
```

#### Using the static method

```javascript
BigArith.abs("-17031986"); //BigArith object with value "17031986"
BigArith.abs("+17031986"); //BigArith object with value "17031986"
BigArith.abs(null); //BigArith object with value "0"
BigArith.abs(); //BigArith object with value "0"
BigArith.abs(NaN); //NaN
```

More examples [here](https://github.com/osofem/BigArith.js/tree/master/examples/)

### See also
* [ceil()](https://osofem.github.io/BigArith.js/documentation/ceil.html)
* [floor()](https://osofem.github.io/BigArith.js/documentation/floor.html)
* [round()](https://osofem.github.io/BigArith.js/documentation/round.html)
* [isNegative()](https://osofem.github.io/BigArith.js/documentation/isnegative.html)
* [isPositive()](https://osofem.github.io/BigArith.js/documentation/ispositive.html)
* [truncate()](https://osofem.github.io/BigArith.js/documentation/truncate.html)
