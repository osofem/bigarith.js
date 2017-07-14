console.log("%cTesting for max", "color: blue; font-size: 20pt;");

var ba = new BigArith(2);
//member function
assertDeepEqual(ba.max("4", 8), new BigArith("8"));
assertDeepEqual(ba.max(-2, -3, -10), new BigArith("2"));
assertDeepEqual(ba.max("two"), new BigArith("2"));
assertDeepEqual(ba.max("2.0"), new BigArith("2"));
assertDeepEqual(ba.max("negative two", "3.0", 987), new BigArith("987"));
assertDeepEqual(ba.max("-2"), new BigArith("2"));
assertDeepEqual(ba.max(), new BigArith("2"));

ba = new BigArith(-2);
assertDeepEqual(ba.max(-4), new BigArith("-2"));

ba = new BigArith(NaN);
assertIsNaN(ba.max("4"));

//static member function
assertDeepEqual(BigArith.max("459", "-165.8987", "165.898700000000000000000", "200", "467"), new BigArith("467"));
assertDeepEqual(BigArith.max("99", "0.123568123", "-0.03455893"), new BigArith("99"));
assertDeepEqual(BigArith.max("45", "4590", "+0.03455893", "0.123568123"), new BigArith("4590"));
assertDeepEqual(BigArith.max(), new BigArith("0"));

//Array of any depth
assertDeepEqual(BigArith.max(2, 3, "5", [3, "8", new BigArith("24"), "two",[78, 8, [2,new BigArith(100)]]]), new BigArith("100"));
assertDeepEqual(BigArith.max(2, 3, "5", [3, "8", new BigArith("24"), "fifty"], new BigArith("30")), new BigArith("50"));

//NaN
assertIsNaN(BigArith.max("4", NaN));
assertIsNaN(BigArith.max(NaN, "4"));