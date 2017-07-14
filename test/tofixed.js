console.log("%cTesting for toFixed", "color: blue; font-size: 20pt;");

var x = new BigArith("0.5"); 
var y = new BigArith("zero point three");
var z = new BigArith(7.65);

var r = new BigArith("-1.35");
assertEqual(r.toFixed(0), (-1.35).toFixed(0));

var r = new BigArith("-1.35");
assertEqual(r.toFixed(1), (-1.35).toFixed(1));

var r = new BigArith("-1.45");
assertEqual(r.toFixed(0), (-1.45).toFixed(0));

var r = new BigArith("-1.55");
assertEqual(r.toFixed(0), (-1.55).toFixed(0));

var r = new BigArith("-1.65");
assertEqual(r.toFixed(0), (-1.65).toFixed(0));

var r = new BigArith("-1.35");
assertEqual(r.toFixed(1), (-1.35).toFixed(1));

var r = new BigArith("-1.55");
assertEqual(r.toFixed(1), (-1.55).toFixed(1));

var r = new BigArith("-1.45");
assertEqual(r.toFixed(1), "-1.5");

var r = new BigArith("-1.46");
assertEqual(r.toFixed(1), (-1.46).toFixed(1));

var r = new BigArith("-1.55");
assertEqual(r.toFixed(1), (-1.55).toFixed(1));

var r = new BigArith("-1.65");
assertEqual(r.toFixed(1), "-1.7");

var r = new BigArith("9");
assertEqual(r.toFixed("5.6"), "9.00000");

var a = new BigArith(".05"); 
var b = new BigArith("eighty three point seven three"); 
var c = new BigArith("56857675753763473473463574574575693849335.567787856456453");

//Fix to decimal places
assertEqual(x.toFixed(3), "0.500");
assertEqual(y.toFixed("7"), "0.3000000");
assertEqual(z.toFixed("0"), "8");
assertEqual(z.toFixed("1"), "7.7");
assertEqual(z.toFixed("54"), "7.650000000000000000000000000000000000000000000000000000");
assertEqual(a.toFixed(new BigArith("200")), "0.05000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
assertEqual(b.toFixed(new BigArith(1e2)), "83.7300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
assertEqual(c.toFixed(new BigArith(0)), "56857675753763473473463574574575693849336");
assertEqual(new BigArith(30.17).toFixed(0), "30");
assertEqual(new BigArith(30).toFixed(2), "30.00");
assertEqual(new BigArith(30).toFixed(0), "30");
assertEqual(new BigArith(30.00798).toFixed(4), "30.0080");
assertEqual(new BigArith("0.999").toFixed(2), "1.00");
assertEqual(new BigArith("0.00999").toFixed(4), "0.0100");
assertEqual(new BigArith("29.6666666666").toFixed(4), "29.6667");

assertEqual(BigArith.toFixed("29.66",4), "29.6600");

//Negative
assertEqual(new BigArith("-29.6666666666").toFixed(4), "-29.6667");
assertEqual(new BigArith("-2345").toFixed(4), "-2345.0000");