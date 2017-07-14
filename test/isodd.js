console.log("%cTesting for isOdd", "color: blue; font-size: 20pt;");

assertExpect(new BigArith(4).isOdd(), false);
assertExpect(new BigArith(3).isOdd(), true);
assertExpect(new BigArith(4.4).isOdd(), false, "Should be false, decimals are not even or odd");
assertExpect(new BigArith("9999999999999999999999999999999999999998655555555555555333333333333333333333338").isOdd(), false);
assertExpect(new BigArith("999999999999999999999999999999999999999865555555555555533333333333333333333333999999").isOdd(), true);

//Negative
assertExpect(new BigArith(-4).isOdd(), false);
assertExpect(new BigArith(-3).isOdd(), true);

assertExpect(new BigArith().isOdd(), false);
assertIsNaN(new BigArith(NaN).isOdd());