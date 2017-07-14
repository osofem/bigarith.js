console.log("%cTesting for sin", "color: blue; font-size: 20pt;");

then = new Date();
var s = BigArith.sin("45");
now = new Date();
assertSimilar(s, new BigArith("1").divide("SQRT2"));
console.log(`Took ${now-then} milliseconds to compute sin 45`);