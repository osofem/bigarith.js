## Welcome to BigArith.js
[![Join the chat at https://gitter.im/BigArith-js/Lobby](https://badges.gitter.im/BigArith-js/Lobby.svg)](https://gitter.im/BigArith-js/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The name <code>BigArith</code> is short for Big Arithmetic i.e. a library that handles very large numbers (be it integers or fractions) to precision.
In this article <code>BigArith.js</code> refers to the library and <code>BigArith</code> refers to the object.

### Where can I use this library?
<code>BigArith.js</code> has been successfully tested on all modern browser. ===TODO===Updated supported browsers=== <!--<code>Google Chrome 42.0</code>, <code>Mozilla Firefox 45</code>, <code>Microsoft Edge 13</code>, <code>Opera 43.0</code>, <code>Safari 9.0</code> and no support for <code>Microsoft Internet Explorer</code>.-->

### How do I include BigArith.js in my code?
There are two ways to include <code>BigArith.js</code> in your code.
1. Include the library from the rawgit.com CDN.<br>
You can do that by adding <code>&lt;script src=&quot;https&#58;&#47;&#47;cdn.rawgit.com/osofem/BigArith.js/&lt;version tag&gt;/BigArith.js&quot;&gt;&lt;/script&gt;</code> to your code. Check [versions](https://github.com/osofem/BigArith.js/tags) for the latest version.
2. Download the source from GitHub.com<br>
You can also download BigArith.js from [releases](https://github.com/osofem/BigArith.js/releases/) on github.com (the latest version is always recommended).

You can choose any of the method that best suit your need.

### How do I initialize BigArith
<code>BigArith</code> can be initialized in various ways.
##### 1. Initiating without any value
```javascript
var ba = new BigArith(); //initialize ba to a BigArith object of value "0"
```
This single line will simply initialize the variable <code>ba</code> to a <code>BigArith</code> object of value <code>"0"</code>.

##### 2. Initiating with number
```javascript
var ba = new BigArith(12345); //initialize ba to a BigArith object of value "12345"
```
The number must be between the <code>Number.MIN_SAFE_INTEGER</code> (-9007199254740991) and <code>Number.MAX_SAFE_INTEGER</code> (9007199254740991) limits else a <code>RangeError</code> will be thrown. <em>Please note that only integers are recommended for this method</em> because of the floating point precision _problem_ in JavaScript (with is one of the problems BigArith.js aim at solving). 
Doing this <code>var ba = new BigArith(0.45);</code> might still be considered _"safe"_ but some people can be tempted to do this <code>var ba = new BigArith(0.1*0.2);</code>. As it is known <code>0.1*0.2</code> will not give <code>0.02</code> in JavaScript but rather <code>0.020000000000000004</code>. Therefore, it is better to avoid initializing fractional numbers this way all together.

> It is recommended fractional numbers are initialized with strings.
> See [here](#init_string) for the howto details.

##### 3. <span id="init_string">Initiating with string</span>
```javascript
var ba = new BigArith("67876445565433556789877654567987457008645656765434567889086654234542126677.8977566766788767"); //initialize ba to a BigArith object of value "67876445565433556789877654567987457008645656765434567889086654234542126677.8977566766788767"
var bb = new BigArith(""); //initialize bb to a BigArith object of value "0"
var bc = new BigArith("-123"); //initialize bc to a BigArith object of value "-123"
var bd = new BigArith("+123"); //initialize bd to a BigArith object of value "123"
var be = new BigArith("123"); //initialize be to a BigArith object of value "123"
```
<code>BigArith.js</code> accepts strings of digits. This can be of any length, can be negative, positive, integer, or fracton. An empty string initializes to <code>"0"</code>. 
Strings that contains characters other than: digits <code>0</code> to <code>9</code>, <code>-</code> or <code>+</code> (at the start of the string), or <code>.</code> (appearing just once), will evaluate to <code>NaN</code>

##### 4. Initiating with words
```javascript
var ba = new BigArith("negative five million six hundred and thirty seven thousand eight hundred and sixty five point three two"); //initialize ba to a BigArith object of value "-5637865.32"
var bb = new BigArith("positive three"); //initialize bb to a BigArith object of value "3"
var bc = new BigArith("three"); //initialize bc to a BigArith object of value "3"
var bd = new BigArith("point two three seven"); //initialize bd to a BigArith object of value "0.237"
```
<code>BigArith.js</code> accepts english words of up to &#177;1x10<sup>1,005</sup>-0.0000{insert 195 more zeroes}01 (i.e. nine hundred and ninety nine trecentretrigintillion point nine nine nine nine nine {insert 195 more "nine"'s}). That is 1,005 length of characteristic and 200 length of mantissa (yea, I know, that is awesome :stuck_out_tongue_winking_eye:). A negative number <em>should</em> start with the word <code>"negative"</code>, a positive number can start with the "postive" word but this can be outrightly omitted. The mantissa part (part after the decimal point) <em>should be spelt out</em> after the word <code>point</code> or else the word will evaluate to <code>NaN</code>.

This is case insensitive and only [Short Scale](#short_scales) naming system is supported.

```javascript
var ba = new BigArith("three point one two"); // This evaluate to "3.12"
var bb = new BigArith("three point twelve"); // This evaluate to NaN
```
##### 5. Initiating with a constant
```javascript
var ba = new BigArith("PI"); // this evaluate to "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196"
```
<code>BigArith.js</code> has a list of inbuilt constants which can be used for initialization. Check [here](#list_constant) for the updated list.

##### 6. Initiating with another BigArith object
```javascript
var ba = new BigArith("3"); //initialize ba to a BigArith object of value "3"
var bb = new BigArith(ba); //initialize bb to the value of ba (i.e. "3")
```

### Working with a BigArith object

#### <span id="#valueOf">valueOf() method</span>
The <code>valueOf()</code> method returns the value of the BigArith object as a strings of digits.
```javascript
var ba = new BigArith("negative five million six hundred and thirty seven thousand eight hundred and sixty five point three two");
console.log(ba.valueOf());//this outputs "-5637865.32" to the console
```

#### toWords() method
The <code>toWords</code> method returns the value of the BigArith object in English words using the [Short Scale](#short_scales) naming system. If the length of the object's characteristic part (part before the decimal point) is greater than 1005 or the length of the mantissa part (part after the decimal point) is greater than 200, a <code>RangeError</code> is thrown.
```javascript
var ba = new BigArith(1e3);
console.log(ba.toWords());//this outputs "one thousand" to the console
```
<hr>
See also:
1. [abs()](https://osofem.github.io/BigArith.js/documentation/abs.html),
2. [add()](https://osofem.github.io/BigArith.js/documentation/add.html),
3. [ceil()](https://osofem.github.io/BigArith.js/documentation/ceil.html),
4. [compare()](https://osofem.github.io/BigArith.js/documentation/compare.html),
5. [compareAbs()](https://osofem.github.io/BigArith.js/documentation/compareabs.html),
6. [divide()](https://osofem.github.io/BigArith.js/documentation/divide.html),
7. [floor()](https://osofem.github.io/BigArith.js/documentation/floor.html),
8. [isEven()](https://osofem.github.io/BigArith.js/documentation/iseven.html),
9. [isNegative()](https://osofem.github.io/BigArith.js/documentation/isnegative.html),
10. [isOdd()](https://osofem.github.io/BigArith.js/documentation/isodd.html),
11. [isPositive()](https://osofem.github.io/BigArith.js/documentation/ispositive.html),
12. [max()](https://osofem.github.io/BigArith.js/documentation/max.html),
13. [min()](https://osofem.github.io/BigArith.js/documentation/min.html)
14. [modulus()](https://osofem.github.io/BigArith.js/documentation/modulus.html)
15. [multiply()](https://osofem.github.io/BigArith.js/documentation/multiply.html),
16. [random()](https://osofem.github.io/BigArith.js/documentation/random.html),
17. [randomInt()](https://osofem.github.io/BigArith.js/documentation/randomint.html),
18. [round()](https://osofem.github.io/BigArith.js/documentation/round.html),
19. [square()](https://osofem.github.io/BigArith.js/documentation/square.html),
20. [squareRoot()](https://osofem.github.io/BigArith.js/documentation/squareroot.html),
21. [subtract()](https://osofem.github.io/BigArith.js/documentation/subtract.html),
22. [toFixed()](https://osofem.github.io/BigArith.js/documentation/tofixed.html),
23. [toWords()](https://osofem.github.io/BigArith.js/documentation/towords.html),
24. [valueOf()](https://osofem.github.io/BigArith.js/documentation/valueof.html)
</ol>



