## Welcome to bigarith.js
[![Join the chat at https://gitter.im/BigArith-js/Lobby](https://badges.gitter.im/BigArith-js/Lobby.svg)](https://gitter.im/BigArith-js/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

`bigarith.js` offers a way to handle **very large numbers** (be it integers, fractionals, strings of digits, english words) to precision. bigarith is from the words **big arith**metic.

### Install
Depending on the environment in which bigarith.js will be used, it can be installed via:

Server-side usage
1. Installing on node.js
	```javascript
	npm install bigarith.js
	```

Client-side usage
1. Including the library from the rawgit.com CDN.<br>
	You can do that by adding `&lt;script src=&quot;https&#58;&#47;&#47;cdn.rawgit.com/osofem/bigarith.js/&lt;version tag&gt;/bigarith.js&quot;&gt;&lt;/script&gt;` to your code. Replace `&lt;version tag&gt;` with the version targeted e.g. `v1.0.0`. Check [versions](https://github.com/osofem/bigarith.js/tags) for the latest version (the latest version is always recommended).
2. Downloading the source from GitHub.com<br>
	You can also download bigarith.js from [releases](https://github.com/osofem/bigarith.js/releases/) on github.com (the latest version is always recommended). Extract the files and include the bigarith.js file in your work.

Choose the method that best suit your need.

### Usage
`bigarith.js` can be initialized in six ways.

> In the server-side, always add the `var BigArith = require('bigarith.js');` however every other thing remains the same in both server-side and client-side.

##### 1. Initiating without any parameter or null
###### Server-side
```javascript
var BigArith = require('bigarith.js');
var ba = new BigArith(); //initialize ba to a BigArith object of value "0"
var ba = new BigArith(null); //initialize ba to a BigArith object of value "0"
```

###### Client-side
```javascript
var ba = new BigArith(); //initialize ba to a BigArith object of value "0"
var ba = new BigArith(null); //initialize ba to a BigArith object of value "0"
```
This simply initialize the variable `ba` to a `BigArith` object of value `"0"`.

##### 2. Initiating with a number
###### Server-side
```javascript
var BigArith = require('bigarith.js');
var ba = new BigArith(12345); //initialize ba to a BigArith object of value "12345"
```

###### Client-side
```javascript
var ba = new BigArith(12345); //initialize ba to a BigArith object of value "12345"
```
The number must be between the `Number.MIN_SAFE_INTEGER` (-9007199254740991) and `Number.MAX_SAFE_INTEGER` (9007199254740991) limits else a `RangeError` will be thrown. <em>Please note that only integers are recommended for this method</em> because of the floating point precision _problem_ in JavaScript (which is one of the problems bigarith.js aim to solve). 

Doing `var ba = new BigArith(0.45);` might still be considered _"safe"_ but some could be tempted to do `var ba = new BigArith(0.1 \* 0.2);`. As it is known `0.1 \* 0.2` will not give `0.02` in JavaScript but rather `0.020000000000000004`. Therefore, it is better to avoid initializing fractional numbers this way.

> It is recommended fractional numbers are initialized with strings.
> See [here](#init_string).

##### 3. <span id="init_string">Initiating with string</span>
###### Server-side
```javascript
var BigArith = require('bigarith.js');
var ba = new BigArith("67876445565433556789877654567987457008645656765434567889086654234542126677.8977566766788767"); //initialize ba to a BigArith object of value "67876445565433556789877654567987457008645656765434567889086654234542126677.8977566766788767"
var bb = new BigArith(""); //initialize bb to a BigArith object of value "0"
var bc = new BigArith("-123"); //initialize bc to a BigArith object of value "-123"
var bd = new BigArith("+123"); //initialize bd to a BigArith object of value "123"
var be = new BigArith("123"); //initialize be to a BigArith object of value "123"
```

###### Client-side
```javascript
var ba = new BigArith("67876445565433556789877654567987457008645656765434567889086654234542126677.8977566766788767"); //initialize ba to a BigArith object of value "67876445565433556789877654567987457008645656765434567889086654234542126677.8977566766788767"
var bb = new BigArith(""); //initialize bb to a BigArith object of value "0"
var bc = new BigArith("-123"); //initialize bc to a BigArith object of value "-123"
var bd = new BigArith("+123"); //initialize bd to a BigArith object of value "123"
var be = new BigArith("123"); //initialize be to a BigArith object of value "123"
```
`bigarith.js` accepts strings of digits. This can be of any length, can be negative, positive, integer, or fractional number. An empty string initializes to `"0"`. 
Strings that contains characters other than: digits `0` to `9`, `-` or `+` (at the start of the string), or `.` (appearing just once), will evaluate to `NaN`

##### 4. Initiating with words
###### Server-side
```javascript
var BigArith = require('bigarith.js');
var ba = new BigArith("negative five million six hundred and thirty seven thousand eight hundred and sixty five point three two"); //initialize ba to a BigArith object of value "-5637865.32"
var bb = new BigArith("positive three"); //initialize bb to a BigArith object of value "3"
var bc = new BigArith("three"); //initialize bc to a BigArith object of value "3"
var bd = new BigArith("point two three seven"); //initialize bd to a BigArith object of value "0.237"
```

###### Client-side
```javascript
var ba = new BigArith("negative five million six hundred and thirty seven thousand eight hundred and sixty five point three two"); //initialize ba to a BigArith object of value "-5637865.32"
var bb = new BigArith("positive three"); //initialize bb to a BigArith object of value "3"
var bc = new BigArith("three"); //initialize bc to a BigArith object of value "3"
var bd = new BigArith("point two three seven"); //initialize bd to a BigArith object of value "0.237"
```
`bigarith.js` accepts english words of up to (&#177;1x10^1,005)-0.0000{insert 195 more zeroes}01 (i.e. nine hundred and ninety nine trecentretrigintillion point nine nine nine nine nine {insert 195 more "nine"'s}). That is 1,005 length of characteristic (parts before the decimal point) and 200 length of mantissa (parts after the decimal point). 

> *This limit only applies to when initializing with words, [initializing with strings](#init_string) can be to any length. 

A negative number <em>should</em> start with the word `"negative"`, a positive number can start with the "positive" word but this can be outrightly omitted. The mantissa part <em>should be spelt out</em> after the word `point` or else the word will evaluate to `NaN`.

This is case insensitive and only [Short Scale](https://osofem.github.io/bigarith.js/documentation/short_scales.html) naming system is supported.

```javascript
var ba = new BigArith("three point one two"); // This evaluate to "3.12"
var bb = new BigArith("three point twelve"); // This evaluate to NaN
```
##### 5. Initiating with a constant
###### Server-side
```javascript
var BigArith = require('bigarith.js');
var ba = new BigArith("PI"); // this evaluate to "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196"
```

###### Client-side
```javascript
var ba = new BigArith("PI"); // this evaluate to "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196"
```
`bigarith.js` has a list of inbuilt constants which can be used for initialization. Check [here](https://osofem.github.io/bigarith.js/documentation/list_constants.html) for the updated list.

##### 6. Initiating with a BigArith object
###### Server-side
```javascript
var BigArith = require('bigarith.js');
var ba = new BigArith("3"); //initialize ba to a BigArith object of value "3"
var bb = new BigArith(ba); //initialize bb to the value of ba (i.e. "3")
```

###### Client-side
```javascript
var ba = new BigArith("3"); //initialize ba to a BigArith object of value "3"
var bb = new BigArith(ba); //initialize bb to the value of ba (i.e. "3")
```

### Functions
#### <span id="toString">toString() method</span>
The `toString()` method returns the value of the BigArith object as a strings of digits.

```javascript
var ba = new BigArith("negative five million six hundred and thirty seven thousand eight hundred and sixty five point three two");
console.log(ba.toString());//this outputs "-5637865.32" to the console
```

#### valueOf() method
The `valueOf()` method returns the value of the BigArith object as a number.

```javascript
var ba = new BigArith("negative five million six hundred and thirty seven thousand eight hundred and sixty five point three two");
console.log(ba.valueOf());//this outputs -5637865.32 to the console
```

> NOTE: Use this function with caution as JavaScript numbers looses precision once it is greater than Number.MAX_SAFE_INTEGER or lesser than Number.MIN_SAFE_INTEGER and becomes "Infinity" when it is greater than Number.MAX_VALUE and "-Infinity" when it is less than Number.MIN_VALUE.

```javascript
var ba = new BigArith("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999.99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
consoole.log(ba.valueOf()); //this outputs Infinity
consoole.log(ba.toString()); //this outputs "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999.99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"
```

#### toWords() method
The `toWords` method returns the value of the BigArith object in English words using the [Short Scale](https://osofem.github.io/bigarith.js/documentation/short_scales.html) naming system. If the length of the object's characteristic part (part before the decimal point) is greater than 1,005 or the length of the mantissa part (part after the decimal point) is greater than 200, a `RangeError` is thrown.

> *This limit only applies to the `toWords()` method function, [toString()](#toString) outputs the value of the BigArith object to any lenth as a string of digits.*

```javascript
var ba = new BigArith(1e3);
console.log(ba.toWords());//this outputs "one thousand" to the console
```

See also:
1. [abs()](https://osofem.github.io/bigarith.js/documentation/abs.html)
2. [add()](https://osofem.github.io/bigarith.js/documentation/add.html)
3. [ceil()](https://osofem.github.io/bigarith.js/documentation/ceil.html)
4. [compare()](https://osofem.github.io/bigarith.js/documentation/compare.html)
5. [compareAbs()](https://osofem.github.io/bigarith.js/documentation/compareabs.html)
6. [divide()](https://osofem.github.io/bigarith.js/documentation/divide.html)
7. [floor()](https://osofem.github.io/bigarith.js/documentation/floor.html)
8. [isEven()](https://osofem.github.io/bigarith.js/documentation/iseven.html)
9. [isNegative()](https://osofem.github.io/bigarith.js/documentation/isnegative.html)
10. [isOdd()](https://osofem.github.io/bigarith.js/documentation/isodd.html)
11. [isPositive()](https://osofem.github.io/bigarith.js/documentation/ispositive.html)
12. [max()](https://osofem.github.io/bigarith.js/documentation/max.html)
13. [min()](https://osofem.github.io/bigarith.js/documentation/min.html)
14. [modulus()](https://osofem.github.io/bigarith.js/documentation/modulus.html)
15. [multiply()](https://osofem.github.io/bigarith.js/documentation/multiply.html)
16. [random()](https://osofem.github.io/bigarith.js/documentation/random.html)
17. [randomInt()](https://osofem.github.io/bigarith.js/documentation/randomint.html)
18. [round()](https://osofem.github.io/bigarith.js/documentation/round.html)
19. [square()](https://osofem.github.io/bigarith.js/documentation/square.html)
20. [squareRoot()](https://osofem.github.io/bigarith.js/documentation/squareroot.html) [unstable]
21. [subtract()](https://osofem.github.io/bigarith.js/documentation/subtract.html)
22. [toFixed()](https://osofem.github.io/bigarith.js/documentation/tofixed.html)
23. [toWords()](https://osofem.github.io/bigarith.js/documentation/towords.html)
24. [toString()](https://osofem.github.io/bigarith.js/documentation/tostring.html)
25. [valueOf()](https://osofem.github.io/bigarith.js/documentation/valueof.html)
26. [truncate()](https://osofem.github.io/bigarith.js/documentation/truuncate.html)
27. [negate()](https://osofem.github.io/bigarith.js/documentation/negate.html)

Full documentation is [here](https://github.com/osofem/bigarith.js/tree/master/documentation).