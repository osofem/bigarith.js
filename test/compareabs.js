console.log("%cTesting for compareabs", "color: blue; font-size: 20pt;");
var x = new BigArith(2);

//CompareAbs
assertEqual(x.compareAbs("2"), 0);
assertEqual(x.compareAbs(-2), 0);
assertEqual(x.compareAbs("two"), 0);
assertEqual(x.compareAbs("2.0"), 0);
assertEqual(x.compareAbs("negative two"), 0);
assertEqual(x.compareAbs("-2"), 0);

//Or
assertEqual(BigArith.compareAbs("-165.8987", "165.898700000000000000000"), 0);
assertEqual(BigArith.compareAbs("0.123568123", "-0.03455893"), 1);
assertEqual(BigArith.compareAbs("+0.03455893", "0.123568123"), -1);

assertEqual(BigArith.compareAbs("", null), 0);

assertIsNaN(BigArith.compareAbs("", NaN));