console.log("%cTesting for negate", "color: blue; font-size: 20pt;");

var ba = new BigArith(2);
assertDeepEqual(ba.negate(), new BigArith("-2"));

ba = new BigArith(-2);
assertDeepEqual(ba.negate(), new BigArith("2"));

ba = new BigArith("-2");
assertDeepEqual(ba.negate(), new BigArith("2"));

ba = new BigArith("+2");
assertDeepEqual(ba.negate(), new BigArith("-2"));

ba = new BigArith("0");
assertDeepEqual(ba.negate(), new BigArith("-0"));

ba = new BigArith(null);
assertDeepEqual(ba.negate(), new BigArith("-0"));

ba = new BigArith("-0");
assertDeepEqual(ba.negate(), new BigArith("0"));

ba = new BigArith(NaN);
assertIsNaN(ba.negate());

//Or
assertDeepEqual(BigArith.negate("-165.8987"), new BigArith("165.8987"));
assertDeepEqual(BigArith.negate("0.123568123"), new BigArith("-0.123568123"));
assertDeepEqual(BigArith.negate("+0.03455893"), new BigArith("-0.03455893"));