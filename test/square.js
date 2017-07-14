console.log("%cTesting for square", "color: blue; font-size: 20pt;");

var x = new BigArith("0.5");
var y = new BigArith("zero point five three");
var z = new BigArith("-9.087");

var a = new BigArith("45.369");
var b = new BigArith("three hundred and forty point five");
var c = new BigArith("+56359823.3265");

assertDeepEqual(x.square(), new BigArith("0.25"));
assertDeepEqual(y.square(), new BigArith("0.2809"));
assertDeepEqual(z.square(), new BigArith("82.573569"));
assertDeepEqual(a.square(), new BigArith("2058.346161"));
assertDeepEqual(b.square(), new BigArith("115940.25"));
assertDeepEqual(c.square(), new BigArith("3176429685394293.52560225"));

var ba = new BigArith("-45.5");
assertDeepEqual(ba.square(), new BigArith("2070.25"));

assertIsNaN(new BigArith(NaN).square());