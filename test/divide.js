console.log("%cTesting for divide", "color: blue; font-size: 20pt;");

assertDeepEqual(BigArith.divide("11460", "1106"), new BigArith("10.36166365280289330922242314647377938517179023508137432188065099457504520795660036166365280289330922242314647377938517179023508137432188065099457504520795660036166365280289330922242314647377938517179024"));

assertDeepEqual(BigArith.divWithRem("64727385000", "541829"), ["119460","492660"]);

assertDeepEqual(BigArith.divide("0.00005601738843121489","0.014833469638891051249761810510689427222312310102108282245106653363"), new BigArith("0.00377641845063315507087295843257478527210704139475622389662176513108956704254338518779084498485519817016583816115994586344697631958939530528719357026258365587667541653231891210978672892569705038022985"));

assertDeepEqual(BigArith.divide("0.01", "0.003"), new BigArith("3.33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333"));

assertDeepEqual(BigArith.divide("-5", "-2"), new BigArith("2.5"));
assertDeepEqual(BigArith.divide("-50", "-3"), new BigArith("16.66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666667"));

assertDeepEqual(BigArith.divide("426", 2), new BigArith(213));
assertDeepEqual(BigArith.divide("128", 2), new BigArith(64));
assertDeepEqual(BigArith.divide("138", 2), new BigArith(69));
assertDeepEqual(BigArith.divide("111369497863972", 2), new BigArith("55684748931986"));

assertDeepEqual(BigArith.divide("9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999998", 2), new BigArith("4999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"));

assertDeepEqual(BigArith.divide("999", "9"), new BigArith("111"));

assertDeepEqual(BigArith.divide("999999999999999999999999999999999999999999999999999999999999999999999999999", "999"), new BigArith("1001001001001001001001001001001001001001001001001001001001001001001001001"));

assertDeepEqual(BigArith.divide("888", "888"), new BigArith("1"));
assertDeepEqual(BigArith.divide("20", "2"), new BigArith("10"));
assertDeepEqual(BigArith.divide("408", "2"), new BigArith("204"));
assertDeepEqual(BigArith.divide("4008", "2"), new BigArith("2004"));
assertDeepEqual(BigArith.divide("40080", "2"), new BigArith("20040"));
assertDeepEqual(BigArith.divide("300", "2"), new BigArith("150"));
assertDeepEqual(BigArith.divide("3000", "2"), new BigArith("1500"));

assertDeepEqual(BigArith.divide("2100", "2"), new BigArith("1050"));
assertDeepEqual(BigArith.divide("20100", "2"), new BigArith("10050"));
assertDeepEqual(BigArith.divide("2222", "22"), new BigArith("101"));
assertDeepEqual(BigArith.divide("2010002400", "2"), new BigArith("1005001200"));
assertDeepEqual(BigArith.divide("9000", "2"), new BigArith("4500"));

assertDeepEqual(BigArith.divide("-4", "2"), new BigArith("-2"));
assertDeepEqual(BigArith.divide("4", "-2"), new BigArith("-2"));
assertDeepEqual(BigArith.divide("-4", "-2"), new BigArith("2"));
assertDeepEqual(BigArith.divide("2222222222222222", "2"), new BigArith("1111111111111111"));
assertDeepEqual(BigArith.divide("600000", "300"), new BigArith("2000"));

//Those with reminders 
assertDeepEqual(BigArith.divide("21", 2), new BigArith("10.5"));
assertDeepEqual(BigArith.divide("21", 5), new BigArith("4.2"));
assertDeepEqual(BigArith.divide("17", 4), new BigArith("4.25"));
assertDeepEqual(BigArith.divide("657654", "1000"), new BigArith("657.654"));

assertDeepEqual(BigArith.divide("89", "3"), new BigArith("29.66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666667"));

assertDeepEqual(BigArith.divide("1", 3), new BigArith("0.33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333"));

assertDeepEqual(BigArith.divide("4", "2"), new BigArith("2"));
assertDeepEqual(BigArith.divide("22", "7"), new BigArith("3.14285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714285714"));

assertDeepEqual(BigArith.divide("5", "708"), new BigArith("0.00706214689265536723163841807909604519774011299435028248587570621468926553672316384180790960451977401129943502824858757062146892655367231638418079096045197740112994350282485875706214689265536723163842"));

assertDeepEqual(BigArith.divide("0", "2"), new BigArith(0));
assertDeepEqual(BigArith.divide("0.5", "0.2"), new BigArith("2.5"));
assertDeepEqual(BigArith.divide("0.5", "0.0234"), new BigArith("21.36752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752136752137"));

assertDeepEqual(BigArith.divide("0.5", "234"), new BigArith("0.00213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675213675"));
assertDeepEqual(BigArith.divide("0.0000345", "12"), new BigArith("0.000002875"));
assertDeepEqual(BigArith.divide("3.45", "12"), new BigArith("0.2875"));
assertDeepEqual(BigArith.divide("345", "0.0000012"), new BigArith("287500000"));
assertDeepEqual(BigArith.divide("345", "1.2"), new BigArith("287.5"));
assertDeepEqual(BigArith.divide("0.5", "0.5"), new BigArith("1"));
assertDeepEqual(BigArith.divide("12.25", "0.765625"), new BigArith("16"));

ba = new BigArith("0.5");
ba = ba.divide("0.866025403");
assertDeepEqual(ba, new BigArith("0.5773502697125848628253229195402712684630106629793629737209914153060935095918889575575186678444350436681128163165440078898008953670380959945120686026804689469368833283519744512621415563718746943038575"));

assertDeepEqual(BigArith.divide(1, new BigArith("SQRT2")), new  BigArith("0.70710678118654752440084436210484903928483593768847403658833986899536623923105351942519376716382078636750692311545614851246241802792536860632206074854996791570661133296375279637789997525057639103028574"));

assertDeepEqual(BigArith.divide("1","0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"), new BigArith("1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"));

//Throws Error
var args = ["2", "0"];
assertThrowError(BigArith.divide, args);// throws division by zero error