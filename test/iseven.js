console.log("%cTesting for isEven", "color: blue; font-size: 20pt;");

assertExpect(new BigArith(4).isEven(), true);
assertExpect(new BigArith(3).isEven(), false);
assertExpect(new BigArith(4.4).isEven(), false, "Should be false, decimals are not even");
assertExpect(new BigArith("9999999999999999999999999999999999999998655555555555555333333333333333333333338").isEven(), true);
assertExpect(new BigArith("999999999999999999999999999999999999999865555555555555533333333333333333333333999999").isEven(), false);

//Negative
assertExpect(new BigArith(-4).isEven(), true);
assertExpect(new BigArith(-3).isEven(), false);

assertExpect(new BigArith().isEven(), true);
assertIsNaN(new BigArith(NaN).isEven());