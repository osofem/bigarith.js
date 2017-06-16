## Welcome to BigArith.js
[![Join the chat at https://gitter.im/BigArith-js/Lobby](https://badges.gitter.im/BigArith-js/Lobby.svg)](https://gitter.im/BigArith-js/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The name <code>BigArith</code> is short for Big Arithmetic i.e. a library that handles very large numbers (be it integers or fractions) to precision.
In this article <code>BigArith.js</code> refers to the library and <code>BigArith</code> refers to the object.

### Where can I use this library?
<code>BigArith.js</code> uses the newly introduced ECMAScript 2015 <code>class</code> keyword so the minimum version of browsers will be <code>Google Chrome 42.0</code>, <code>Mozilla Firefox 45</code>, <code>Microsoft Edge 13</code>, <code>Opera 43.0</code>, <code>Safari 9.0</code> and no support for <code>Microsoft Internet Explorer</code>.

### Why the use of class instead of the widely supported Function.prototype?
Hmm, will think up some reasons shortly

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
The number must be between the <code>Number.MIN_SAFE_INTEGER</code> (-9007199254740991) and <code>Number.MAX_SAFE_INTEGER</code> (9007199254740991) limits else an error will be thrown. <em>Please note that only integers are recommended for this method</em> because of the floating point precision _problem_ in JavaScript (with is one of the problem BigArith.js aim at solving). 
Doing this <code>var ba = new BigArith(0.45);</code> might still be _"safe"_ but some people can be tempted to do this <code>var ba = new BigArith(0.1*0.2);</code>. As it is known <code>0.1*0.2</code> will not give <code>0.02</code> in JavaScript but rather <code>0.020000000000000004</code>. So it is better to avoid initializing fractional numbers this way all together.

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
var ba = new BigArith("negative five million six hundred and thirty seven thousand eight hundred and six five point three two"); //initialize ba to a BigArith object of value "-5637805.32"
var bb = new BigArith("positive three"); //initialize bb to a BigArith object of value "3"
var bc = new BigArith("three"); //initialize bc to a BigArith object of value "3"
var bd = new BigArith("point two three seven"); //initialize bd to a BigArith object of value "0.237"
```
<code>BigArith.js</code> accepts english words of up to &#177;1x10<sup>124</sup>-0.0000{insert 195 more zeroes}01 (i.e. nine hundred and ninety nine quadragintillion point nine nine nine nine nine {insert 195 more "nine"'s}). A negative number <em>should</em> start with the word <code>"negative"</code>, a positive number can start with the "postive" word but this can be outrightly omitted. The mantissa part (part after the decimal point) <em>should be spelt out</em> after the word <code>point</code> or else the word will evaluate to <code>NaN</code>.
[Short Scale](https://en.wikipedia.org/wiki/Long_and_short_scales) naming system should be used.

```javascript
var ba = new BigArith("three point one two"); // This evaluate to "3.12"
var bb = new BigArith("three point twelve"); // This evaluate to NaN
```
##### 5. Initiating with a constant
```javascript
var ba = new BigArith("PI"); // this evaluate to "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196"
```
<code>BigArith.js</code> has a list of inbuilt constants which can be used for initialization. Check [here](#list_constant) for the updated list.

### Working with a BigArith object

### <span id="list_constant">List of constants</span>
Here is a updated list of constants predefined in <code>BigArith.js</code>
Constant | Description | Value
------------ | ------------ | -------------
PI | pi | 3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196
LN2 | ln(2) | 0.6931471805599453
LN10 | ln(10) | 2.302585092994046
LOG2E | log<sub>e</sub><sup>2</sup> | 1.4426950408889634
LOG10E | log<sub>e</sub><sup>10</sup> | 0.4342944819032518
SQRT1_2 | &#8730;&#0189; | 0.70710678118654752440084436210484903928483593768847403658833986899536623923105351942519376716382078636750692311545614851246241802792536860632206074854996791570661133296375279637789997525057639103028574
SQRT2 | &#8730;2 | 1.41421356237309504880168872420969807856967187537694807317667973799073247846210703885038753432764157273501384623091229702492483605585073721264412149709993583141322266592750559275579995050115278206057147
E | e | 2.71828182845904523536028747135266249775724709369995957496696762772407663035354759457138217852516642742746639193200305992181741359662904357290033429526059563073813232862794349076323382988075319525101901
