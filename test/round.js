console.log("%cTesting for round", "color: blue; font-size: 20pt;");

var x = new BigArith("0.5");
var y = new BigArith("zero point three");
var z = new BigArith(7.45);

var a = new BigArith(".05");
var b = new BigArith("eighty three point seven three");
var c = new BigArith("56857675753763473473463574574575693849335.567787856456453");

//Round to the nearest interger
assertDeepEqual(x.round(), new BigArith(1));
assertDeepEqual(y.round(), new BigArith(0));
assertDeepEqual(z.round(), new BigArith(7));
assertDeepEqual(a.round(), new BigArith(0));
assertDeepEqual(b.round(), new BigArith(84));
assertDeepEqual(c.round(), new BigArith("56857675753763473473463574574575693849336"));

//Negative
assertDeepEqual(new BigArith("-45.456").round(), new BigArith("-45"));
assertDeepEqual(new BigArith("-45.5").round(), new BigArith("-46"));
assertDeepEqual(new BigArith("-75.756").round(), new BigArith("-76"));
assertDeepEqual(new BigArith("-20.51").round(), new BigArith("-21"));

assertDeepEqual(BigArith.round("-20.51"), new BigArith("-21"));
assertIsNaN(new BigArith(NaN).round());