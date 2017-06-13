## Welcome to BigArith

The name <code>BigArith</code> is short for Big Arithmetic i.e. a library that handles very large numbers (be it integers or fractions) to precision.

### Where can I use this library?
<code>BigArith</code> uses the newly introduced ECMAScript 2015 <code>class</code> keyword so the minimum version of browsers will be <code>Google Chrome 42.0</code>, <code>Mozilla Firefox 45</code>, <code>Microsoft Edge 13</code>, <code>Opera 43.0</code>, <code>Safari 9.0</code> and no support for <code>Microsoft Internet Explorer</code>.

### Why the use of <code>class</code> instead of the widely supported <code>Function.prototype</code>?
Hmm, will think up some reasons shortly

### How do I include <code>BigArith</code> in my code?
There are two ways to include <code>BigArith</code> in your code and you can choose the one that suits your need.
1. Include the library from the rawgit CDN.<br>
  You can do that by adding <code><script src="https://cdn.rawgit.com/osofem/BigArith.js/v0.0/BigArith.js"></script&gt;</code> to your code (but remember to change the <code>v0.0</code> part to the version you are targetting, the latest version is always recommended). Check https://github.com/osofem/BigArith.js/releases/ for the latest version.
2. Download the source from GitHub.com<br>
You can also download <code>BigArith</code> from <code>https://github.com/osofem/BigArith.js/releases/</code> (the latest version is always recommended).

### How do I initialize the <code>BigArith</code> object
The <code>BigArith</code> object can be initialized with a single line of code.
```
var ba = new BigArith();
```
This single line will simply initialize the variable <code>ba</code> to a <code>BigArith</code> object of value <code>"0"</code>.
