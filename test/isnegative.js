console.log("%cTesting for isNegative", "color: blue; font-size: 20pt;");

var ba = new BigArith("zero point five");
assertExpect(ba.isNegative(), false);

ba = new BigArith("negative zero point five");
assertExpect(ba.isNegative(), true);

ba = new BigArith("-234");
assertExpect(ba.isNegative(), true);

ba = new BigArith("+8758376");
assertExpect(ba.isNegative(), false);

ba = new BigArith("-0");
assertExpect(ba.isNegative(), true);

ba = new BigArith(NaN);
assertIsNaN(ba.isNegative());