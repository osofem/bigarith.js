console.log("%cTesting for squareRoot", "color: blue; font-size: 20pt;");

assertDeepEqual(new BigArith(4).squareRoot(), new BigArith("2"));
assertDeepEqual(new BigArith(16).squareRoot(), new BigArith("4"));


let then = new Date();
assertDeepEqual(new BigArith(2).squareRoot(), new BigArith("SQRT2"));
let now = new Date();
console.log(now-then);

assertDeepEqual(new BigArith("0152.2756").squareRoot(), new BigArith("12.34"));
assertDeepEqual(new BigArith(0).squareRoot(), new BigArith("0"));

//Negative numbers should give NaN
assertIsNaN(new BigArith("-4").squareRoot());
assertIsNaN(new BigArith(NaN).squareRoot());