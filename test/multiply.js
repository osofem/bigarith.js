console.log("%cTesting for multiply", "color: blue; font-size: 20pt;");

var x = new BigArith("0.5");
var y = new BigArith("zero point five");
var z = new BigArith(0.5);

var a = new BigArith(".5");
var b = new BigArith("point five");
var c = new BigArith(5e-1);

assertDeepEqual(BigArith.multiply("000002","03"), new BigArith("6"));
assertDeepEqual(BigArith.multiply("-0","03"), new BigArith("0"));

//You should be able to multiply words, strings or numbers and a BigArith object using the multiply() function
var result = x.multiply("point five").multiply(.5).multiply(".5").multiply(5e-1);
assertDeepEqual(result, new BigArith(0.03125)); // => "0.03125" = 0.5 * 0.5 * 0.5 * 0.5 * 0.5 

//You should be able to multiply BigArith objects with each other using the multiply() function
result = x.multiply(y).multiply(z);
assertDeepEqual(result, new BigArith(0.125));// => "0.125" = 0.5 * 0.5 * 0.5

//You should be able to take a result and still multiply with it
result = result.multiply(2)
assertDeepEqual(result, new BigArith(0.25)); // => "0.25" = 0.125 * 2

/*	The multiply() function always result a BigArith object 
* 	Get the value of your result as a string using the valueOf() function*/
assertEqual(result.toString(), "0.25"); // => "0.25" 

//You should be able to multiply BigArith constants with each other
d = new BigArith("PI");
assertEqual(d.multiply(new BigArith("SQRT2")).toString(), "4.4428829381583662470158809900606936986146216893756902230853956069564347930994739105753269347647652373634102126852287913643595985183456274923753463596744150232792788197558775331134536611013065221276530128699651998226703464396427443872524914465638657528888510274321473482059474372598508678988359454771357116435627029778988197239706041672623879529785423779364609989555472275672415037451495117097029786812");


then = new Date();
assertEqual(BigArith.multiply("9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999","99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999998").toString(), "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999979999999999999999999999999999999999999999999999999999999900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002");
now = new Date();
console.log(`Takes ${now-then} milliseconds to multiply 2 two hundred digits`);

//Further example
var ai = new BigArith("one point five");
var bi = new BigArith("123");
var ci = new BigArith(3); 
result = ai.multiply(bi).multiply(ci);
assertEqual(result.toString(), "553.5"); // => "553.5" = 1.5 * 123 * 3

//You should be able to do this
d = new BigArith("5");
result = d.multiply("negative three");
assertEqual(result.toString(), "-15"); // => "-15" = 5 * (-3)

//Get your answers in words
var hj = new BigArith("six hundred and three");
assertEqual(hj.multiply("ten").toWords(), "six thousand thirty");
assertEqual(hj.multiply("twenty").toWords(), "twelve thousand sixty");

var i = new BigArith("five hundred");
assertEqual(i.multiply("two hundred and seven").toWords(), "one hundred and three thousand five hundred");

i = new BigArith("one thousand point three");
assertEqual(i.multiply("three hundred and two").toWords(), "three hundred and two thousand ninety point six");
assertEqual(i.multiply("one").toWords(), "one thousand point three");
assertEqual(i.multiply("negative one").toWords(), "negative one thousand point three");
assertEqual(i.multiply("negative five point three eight").toWords(), "negative five thousand three hundred and eighty one point six one four");

assertEqual(BigArith.multiply("two", 3).toString(), "6");

assertEqual(BigArith.multiply("-2", "-2").toString(), "4");

assertDeepEqual(BigArith.multiply("0.00789", "0.065"), new BigArith("0.00051285"));