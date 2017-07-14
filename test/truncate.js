console.log("%cTesting for truncate", "color: blue; font-size: 20pt;");

var x = new BigArith("0.5"); 
var y = new BigArith("zero point three");
var z = new BigArith(7.45);

var a = new BigArith(".05");
var b = new BigArith("eighty three point seven three");
var c = new BigArith("56857675753763473473463574574575693849335.567787856456453");

assertDeepEqual(x.truncate(), new BigArith(0));
assertDeepEqual(y.truncate(), new BigArith(0));
assertDeepEqual(z.truncate(), new BigArith(7));
assertDeepEqual(a.truncate(), new BigArith(0));
assertDeepEqual(b.truncate(), new BigArith(83));
assertDeepEqual(c.truncate(), new BigArith("56857675753763473473463574574575693849335"));

assertDeepEqual(new BigArith("-45.23").truncate(), new BigArith("-45"));
assertDeepEqual(new BigArith("-57.99").truncate(), new BigArith("-57"));
assertDeepEqual(new BigArith("13.37").truncate(), new BigArith("13"));
assertDeepEqual(new BigArith("42.84").truncate(), new BigArith("42"));
assertDeepEqual(new BigArith("0.123").truncate(), new BigArith("0"));
assertDeepEqual(new BigArith("-0.123").truncate(), new BigArith("-0"));
assertDeepEqual(new BigArith("-1.123").truncate(), new BigArith("-1"));
assertDeepEqual(new BigArith().truncate(), new BigArith("0"));

assertIsNaN(new BigArith(NaN).truncate());
assertIsNaN(new BigArith("df").truncate());