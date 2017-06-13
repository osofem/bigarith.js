## Welcome to BigArith
[![Join the chat at https://gitter.im/BigArith-js/Lobby](https://badges.gitter.im/BigArith-js/Lobby.svg)](https://gitter.im/BigArith-js/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The name <code>BigArith</code> is short for Big Arithmetic i.e. a library that handles very large numbers (be it integers or fractions) to precision.

### Where can I use this library?
<code>BigArith</code> uses the newly introduced ECMAScript 2015 <code>class</code> keyword so the minimum version of browsers will be <code>Google Chrome 42.0</code>, <code>Mozilla Firefox 45</code>, <code>Microsoft Edge 13</code>, <code>Opera 43.0</code>, <code>Safari 9.0</code> and no support for <code>Microsoft Internet Explorer</code>.

### Why the use of class instead of the widely supported Function.prototype?
Hmm, will think up some reasons shortly

### How do I include <code>BigArith</code> in my code?
There are two ways to include <code>BigArith</code> in your code and you can choose the one that suits your need.
1. Include the library from the rawgit CDN.<br>
  You can do that by adding <code><script src="https://cdn.rawgit.com/osofem/BigArith.js/v0.0/BigArith.js"></script&gt;</code> to your code (but remember to change the <code>v0.0</code> part to the version you are targetting, the latest version is always recommended). Check https://github.com/osofem/BigArith.js/releases/ for the latest version.
2. Download the source from GitHub.com<br>
You can also download <code>BigArith</code> from <code>https://github.com/osofem/BigArith.js/releases/</code> (the latest version is always recommended).

### How do I initialize the <code>BigArith</code> object
The <code>BigArith</code> object can be initialized with a single line of code.
```javascript
var ba = new BigArith();
```
This single line will simply initialize the variable <code>ba</code> to a <code>BigArith</code> object of value <code>"0"</code>.

Other ways to initialize the library are
##### 1. Initiating with number
```javascript
var ba = new BigArith(12345);
```
The number must be between the <code>Number.MIN_SAFE_INTEGER</code> and <code>Number.MAX_SAFE_INTEGER</code> value else an error will be thrown. <em>Only integers are recommended for this method</em> however this will not throw an error if fractions are used. However, <em>it is recommended that fractions are initialized with strings.</em> See <a href="#init_string">here</a>.

##### 2. Initiating with string
```javascript
var ba = new BigArith("67876445565433556789877654567987457008645656765434567889086654234542126677.8977566766788767");
var bb = new BigArith(""); //this initialize variable bb to a BigArith object of value "0"
var bc = new BigArith("-123"); //this initialize variable bb to a BigArith object of value "-123"
var bd = new BigArith("+123"); //this initialize variable bd to a BigArith object of value "123"
```
<code>BigArith</code> also accepts strings of digits. This can be of any length, can be negative, positive, integer, or fracton. <em>If fractions are to be used, it is recommended they are passed in as strings.</em> An empty string initialize to <code>"0"</code>

##### 3. Initiating with words
```javascript
var ba = new BigArith("negative five million six hundred and thirty seven thousand eight hundred and six five point three two");
var bb = new BigArith("positive three"); //this initialize variable bb to a BigArith object of value "3"
var bc = new BigArith("three"); //this initialize variable bc to a BigArith object of value "3"
var bd = new BigArith("point two three seven"); //this initialize variable bd to a BigArith object of value "0.237"
```
<code>BigArith</code> accepts english words of up to <code>&#177;1x10<sup>124</sup>-0.0000{insert 195 more zeroes}01</code> (i.e. <code>nine hundred and ninety nine quadragintillion point nine nine nine nine nine {insert 195 more "nine"'s}</code>). A negative number <em>should</em> start with the word <code>"negative"</code>, a positive number can start with the "postive" word or this can be outrightly omitted. The fraction part <em>should be spelt out</em> after the word <code>point</code> or else the word will evaluate to <code>NaN</code>.

```javascript
var ba = new BigArith("three point one two"); // This evaluate to '3.12"
var bb = new BigArith("three point twelve"); // This evaluate to NaN
```
##### 4. Initiating with a constant
```javascript
var ba = new BigArith("PI"); // this evaluate to "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196"
```
<code>BigArith</code> has a list of inbuilt constants which can be ble used the initialization. Check <a href="#list_constant">here</a> for the updated list.
