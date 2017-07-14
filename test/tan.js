console.log("%cTesting for tan", "color: blue; font-size: 20pt;");

then = new Date();
var s = BigArith.tan("45");
now = new Date();
assertSimilar(s, new BigArith("1"));
console.log(`Took ${now-then} milliseconds to compute 45 45`);