console.log("%cTesting for compare", "color: blue; font-size: 20pt;");
var x = new BigArith(2);

//Compare
assertEqual(x.compare("2"), 0);
assertEqual(x.compare(-2), 1);
assertEqual(x.compare("two"), 0);
assertEqual(x.compare("two"), 0);
assertEqual(x.compare("negative two"), 1);
assertEqual(x.compare("-2"), 1);

var ba = new BigArith();
assertEqual(ba.compare(null), 0);

assertEqual(BigArith.compare("+165.8987","165.898700000000000000000"), 0);
assertEqual(BigArith.compare("0.123568123","0.03455893"), 1);
assertEqual(BigArith.compare("2","3"), -1);
assertEqual(BigArith.compare(null, "0"), 0);
assertEqual(BigArith.compare("", "0"), 0);
assertEqual(BigArith.compare(null, "1"), -1);
assertEqual(BigArith.compare(null, "-1"), 1);
assertIsNaN(BigArith.compare(NaN, "0"));