console.log("%cTesting for min", "color: blue; font-size: 20pt;");

var ba = new BigArith(2);
//member function 
assertDeepEqual(ba.min("2", 45, -98), new BigArith("-98"));
assertDeepEqual(ba.min(-2, -90), new BigArith("-90"));
assertDeepEqual(ba.min("one"), new BigArith("1"));
assertDeepEqual(ba.min("2.0"), new BigArith("2"));
assertDeepEqual(ba.min("negative two", -89, -234, 788), new BigArith("-234"));
assertDeepEqual(ba.min("-2"), new BigArith("-2"));
assertDeepEqual(ba.min(), new BigArith("2"));

ba = new BigArith(NaN);
assertIsNaN(ba.min(-7));

//static member function
assertDeepEqual(BigArith.min("-165.8987", "165.898700000000000000000", "345"), new BigArith("-165.8987"));
assertDeepEqual(BigArith.min("0.123568123", "-0.03455893", "-0.000989"), new BigArith("-0.03455893"));
assertDeepEqual(BigArith.min("0.93455893", "-0.123568123", "45.89"), new BigArith("-0.123568123"));

//NaN
assertIsNaN(BigArith.min("0.93455893", "-0.123568123", "45.89", NaN));
assertIsNaN(BigArith.min(NaN));

//Array to any depth
assertDeepEqual(BigArith.min(2, 3, "5", [3, "8", new BigArith("24"), "two",[1]]), new BigArith("1"));
assertDeepEqual(BigArith.min(2, 3, "5", [3, "8", new BigArith("0"), "fifty"], new BigArith("30")), new BigArith("0"));