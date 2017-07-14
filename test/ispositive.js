console.log("%cTesting for isPositive", "color: blue; font-size: 20pt;");

var ba = new BigArith("zero point five");
assertExpect(ba.isPositive(), true);

ba = new BigArith("negative zero point five");
assertExpect(ba.isPositive(), false);

ba = new BigArith("-234");
assertExpect(ba.isPositive(), false);

ba = new BigArith("+8758376");
assertExpect(ba.isPositive(), true);

ba = new BigArith("-17031986");
assertExpect(ba.isPositive(), false);

ba = new BigArith("-0");
assertExpect(ba.isPositive(), false); 

ba = new BigArith();
assertExpect(ba.isPositive(), true);

ba = new BigArith(null);
assertExpect(ba.isPositive(), true);

ba = new BigArith(NaN);
assertIsNaN(ba.isPositive()); 