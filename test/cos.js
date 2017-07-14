console.log("%cTesting for cos", "color: blue; font-size: 20pt;");
then = new Date();
var s = BigArith.cos("45");
now = new Date();
assertSimilar(s, new BigArith("1").divide("SQRT2"));
console.log(`Took ${now-then} milliseconds to compute cos 45`);