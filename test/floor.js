console.log("%cTesting for floor", "color: blue; font-size: 20pt;");

var x = new BigArith("0.5"); 
var y = new BigArith("zero point three");
var z = new BigArith(7.45);

var a = new BigArith(".05");
var b = new BigArith("eighty three point seven three");
var c = new BigArith("56857675753763473473463574574575693849335.567787856456453");

assertDeepEqual(x.floor(), new BigArith(0));
assertDeepEqual(y.floor(), new BigArith(0));
assertDeepEqual(z.floor(), new BigArith(7));
assertDeepEqual(a.floor(), new BigArith(0));
assertDeepEqual(b.floor(), new BigArith(83));
assertDeepEqual(c.floor(), new BigArith("56857675753763473473463574574575693849335"));

assertDeepEqual(BigArith.floor("-45.23"), new BigArith("-46"));

//Negative
assertDeepEqual(new BigArith("-45.23").floor(), new BigArith("-46"));
assertDeepEqual(new BigArith("-57.99").floor(), new BigArith("-58"));

assertDeepEqual(BigArith.floor(), new BigArith(0));
assertDeepEqual(BigArith.floor(null), new BigArith(0));
assertIsNaN(BigArith.floor(NaN));