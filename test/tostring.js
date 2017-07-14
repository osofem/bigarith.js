console.log("%cTesting for toString", "color: blue; font-size: 20pt;");

/*toString*/

//Empty parameter
var ba = new BigArith(); 
assertEqual(ba.toString(), "0");

var ba = new BigArith(); 
assertEqual(ba.toString(), "0");

//Empty string
ba = new BigArith(""); 
assertEqual(ba.toString(), "0");

//Numbers
ba = new BigArith(123);
assertEqual(ba.toString(), "123");

ba = new BigArith(5e3);
assertEqual(ba.toString(), "5000");

ba = new BigArith(Number.MAX_SAFE_INTEGER);
assertEqual(ba.toString(), "9007199254740991");

ba = new BigArith(Number.MIN_SAFE_INTEGER);
assertEqual(ba.toString(), "-9007199254740991");

//Strings of digits
ba = new BigArith("0.5");
assertEqual(ba.toString(), "0.5");

ba = new BigArith("-34"); 
assertEqual(ba.toString(), "-34");

ba = new BigArith("+34");
assertEqual(ba.toString(), "34");

ba = new BigArith(".34");
assertEqual(ba.toString(), "0.34");

ba = new BigArith("99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999.999");
assertEqual(ba.toString(), "99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999.999");

assertEqual(ba.toString(), "99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999.999");
//English words
ba = new BigArith("twenty five point three eight"); 
assertEqual(ba.toString(), "25.38");

ba = new BigArith("negative thirty four");
assertEqual(ba.toString(), "-34");

ba = new BigArith("positive sixty eight");
assertEqual(ba.toString(), "68");

ba = new BigArith("sixty eight");
assertEqual(ba.toString(), "68");

ba = new BigArith("point three four");
assertEqual(ba.toString(), "0.34");

ba = new BigArith("nine hundred and ninety nine trecentretrigintillion nine hundred and ninety nine trecendotrigintillion nine hundred and ninety nine trecenuntrigintillion nine hundred and ninety nine trecentrigintillion nine hundred and ninety nine trecennovemvigintillion nine hundred and ninety nine trecenoctovigintillion nine hundred and ninety nine trecenseptenvigintillion nine hundred and ninety nine trecensexvigintillion nine hundred and ninety nine trecenquinvigintillion nine hundred and ninety nine trecenquattuorvigintillion nine hundred and ninety nine trecentrevigintillion nine hundred and ninety nine trecendovigintillion nine hundred and ninety nine trecenunvigintillion nine hundred and ninety nine trecenvigintillion nine hundred and ninety nine trecennovemdecillion nine hundred and ninety nine trecenoctodecillion nine hundred and ninety nine trecenseptendecillion nine hundred and ninety nine trecensexdecillion nine hundred and ninety nine trecenquindecillion nine hundred and ninety nine trecenquattuordecillion nine hundred and ninety nine trecentredecillion nine hundred and ninety nine trecendodecillion nine hundred and ninety nine trecenundecillion nine hundred and ninety nine trecendecillion nine hundred and ninety nine trecennovemtillion nine hundred and ninety nine trecenoctotillion nine hundred and ninety nine trecenseptentillion nine hundred and ninety nine trecensextillion nine hundred and ninety nine trecenquintillion nine hundred and ninety nine trecenquattuortillion nine hundred and ninety nine trecentretillion nine hundred and ninety nine trecendotillion nine hundred and ninety nine trecenuntillion nine hundred and ninety nine trecentillion nine hundred and ninety nine duocennovemnonagintillion nine hundred and ninety nine duocenoctononagintillion nine hundred and ninety nine duocenseptennonagintillion nine hundred and ninety nine duocensexnonagintillion nine hundred and ninety nine duocenquinnonagintillion nine hundred and ninety nine duocenquattuornonagintillion nine hundred and ninety nine duocentrenonagintillion nine hundred and ninety nine duocendononagintillion nine hundred and ninety nine duocenunnonagintillion nine hundred and ninety nine duocennonagintillion nine hundred and ninety nine duocennovemoctogintillion nine hundred and ninety nine duocenoctooctogintillion nine hundred and ninety nine duocenseptenoctogintillion nine hundred and ninety nine duocensexoctogintillion nine hundred and ninety nine duocenquinoctogintillion nine hundred and ninety nine duocenquattuoroctogintillion nine hundred and ninety nine duocentreoctogintillion nine hundred and ninety nine duocendooctogintillion nine hundred and ninety nine duocenunoctogintillion nine hundred and ninety nine duocenoctogintillion nine hundred and ninety nine duocennovemseptuagintillion nine hundred and ninety nine duocenoctoseptuagintillion nine hundred and ninety nine duocenseptenseptuagintillion nine hundred and ninety nine duocensexseptuagintillion nine hundred and ninety nine duocenquinseptuagintillion nine hundred and ninety nine duocenquattuorseptuagintillion nine hundred and ninety nine duocentreseptuagintillion nine hundred and ninety nine duocendoseptuagintillion nine hundred and ninety nine duocenunseptuagintillion nine hundred and ninety nine duocenseptuagintillion nine hundred and ninety nine duocennovemsexagintillion nine hundred and ninety nine duocenoctosexagintillion nine hundred and ninety nine duocenseptensexagintillion nine hundred and ninety nine duocensexsexagintillion nine hundred and ninety nine duocenquinsexagintillion nine hundred and ninety nine duocenquattuorsexagintillion nine hundred and ninety nine duocentresexagintillion nine hundred and ninety nine duocendosexagintillion nine hundred and ninety nine duocenunsexagintillion nine hundred and ninety nine duocensexagintillion nine hundred and ninety nine duocennovemquinquagintillion nine hundred and ninety nine duocenoctoquinquagintillion nine hundred and ninety nine duocenseptenquinquagintillion nine hundred and ninety nine duocensexquinquagintillion nine hundred and ninety nine duocenquinquinquagintillion nine hundred and ninety nine duocenquattuorquinquagintillion nine hundred and ninety nine duocentrequinquagintillion nine hundred and ninety nine duocendoquinquagintillion nine hundred and ninety nine duocenunquinquagintillion nine hundred and ninety nine duocenquinquagintillion nine hundred and ninety nine duocennovemquadragintillion nine hundred and ninety nine duocenoctoquadragintillion nine hundred and ninety nine duocenseptenquadragintillion nine hundred and ninety nine duocensexquadragintillion nine hundred and ninety nine duocenquinquadragintillion nine hundred and ninety nine duocenquattuorquadragintillion nine hundred and ninety nine duocentrequadragintillion nine hundred and ninety nine duocendoquadragintillion nine hundred and ninety nine duocenunquadragintillion nine hundred and ninety nine duocenquadragintillion nine hundred and ninety nine duocennovemtrigintillion nine hundred and ninety nine duocenoctotrigintillion nine hundred and ninety nine duocenseptentrigintillion nine hundred and ninety nine duocensextrigintillion nine hundred and ninety nine duocenquintrigintillion nine hundred and ninety nine duocenquattuortrigintillion nine hundred and ninety nine duocentretrigintillion nine hundred and ninety nine duocendotrigintillion nine hundred and ninety nine duocenuntrigintillion nine hundred and ninety nine duocentrigintillion nine hundred and ninety nine duocennovemvigintillion nine hundred and ninety nine duocenoctovigintillion nine hundred and ninety nine duocenseptenvigintillion nine hundred and ninety nine duocensexvigintillion nine hundred and ninety nine duocenquinvigintillion nine hundred and ninety nine duocenquattuorvigintillion nine hundred and ninety nine duocentrevigintillion nine hundred and ninety nine duocendovigintillion nine hundred and ninety nine duocenunvigintillion nine hundred and ninety nine duocenvigintillion nine hundred and ninety nine duocennovemdecillion nine hundred and ninety nine duocenoctodecillion nine hundred and ninety nine duocenseptendecillion nine hundred and ninety nine duocensexdecillion nine hundred and ninety nine duocenquindecillion nine hundred and ninety nine duocenquattuordecillion nine hundred and ninety nine duocentredecillion nine hundred and ninety nine duocendodecillion nine hundred and ninety nine duocenundecillion nine hundred and ninety nine duocendecillion nine hundred and ninety nine duocennovemtillion nine hundred and ninety nine duocenoctotillion nine hundred and ninety nine duocenseptentillion nine hundred and ninety nine duocensextillion nine hundred and ninety nine duocenquintillion nine hundred and ninety nine duocenquattuortillion nine hundred and ninety nine duocentretillion nine hundred and ninety nine duocendotillion nine hundred and ninety nine duocenuntillion nine hundred and ninety nine duocentillion nine hundred and ninety nine cennovemnonagintillion nine hundred and ninety nine cenoctononagintillion nine hundred and ninety nine censeptennonagintillion nine hundred and ninety nine censexnonagintillion nine hundred and ninety nine cenquinnonagintillion nine hundred and ninety nine cenquattuornonagintillion nine hundred and ninety nine centrenonagintillion nine hundred and ninety nine cendononagintillion nine hundred and ninety nine cenunnonagintillion nine hundred and ninety nine cennonagintillion nine hundred and ninety nine cennovemoctogintillion nine hundred and ninety nine cenoctooctogintillion nine hundred and ninety nine censeptenoctogintillion nine hundred and ninety nine censexoctogintillion nine hundred and ninety nine cenquinoctogintillion nine hundred and ninety nine cenquattuoroctogintillion nine hundred and ninety nine centreoctogintillion nine hundred and ninety nine cendooctogintillion nine hundred and ninety nine cenunoctogintillion nine hundred and ninety nine cenoctogintillion nine hundred and ninety nine cennovemseptuagintillion nine hundred and ninety nine cenoctoseptuagintillion nine hundred and ninety nine censeptenseptuagintillion nine hundred and ninety nine censexseptuagintillion nine hundred and ninety nine cenquinseptuagintillion nine hundred and ninety nine cenquattuorseptuagintillion nine hundred and ninety nine centreseptuagintillion nine hundred and ninety nine cendoseptuagintillion nine hundred and ninety nine cenunseptuagintillion nine hundred and ninety nine censeptuagintillion nine hundred and ninety nine cennovemsexagintillion nine hundred and ninety nine cenoctosexagintillion nine hundred and ninety nine censeptensexagintillion nine hundred and ninety nine censexsexagintillion nine hundred and ninety nine cenquinsexagintillion nine hundred and ninety nine cenquattuorsexagintillion nine hundred and ninety nine centresexagintillion nine hundred and ninety nine cendosexagintillion nine hundred and ninety nine cenunsexagintillion nine hundred and ninety nine censexagintillion nine hundred and ninety nine cennovemquinquagintillion nine hundred and ninety nine cenoctoquinquagintillion nine hundred and ninety nine censeptenquinquagintillion nine hundred and ninety nine censexquinquagintillion nine hundred and ninety nine cenquinquinquagintillion nine hundred and ninety nine cenquattuorquinquagintillion nine hundred and ninety nine centrequinquagintillion nine hundred and ninety nine cendoquinquagintillion nine hundred and ninety nine cenunquinquagintillion nine hundred and ninety nine cenquinquagintillion nine hundred and ninety nine cennovemquadragintillion nine hundred and ninety nine cenoctoquadragintillion nine hundred and ninety nine censeptenquadragintillion nine hundred and ninety nine censexquadragintillion nine hundred and ninety nine cenquinquadragintillion nine hundred and ninety nine cenquattuorquadragintillion nine hundred and ninety nine centrequadragintillion nine hundred and ninety nine cendoquadragintillion nine hundred and ninety nine cenunquadragintillion nine hundred and ninety nine cenquadragintillion nine hundred and ninety nine cennovemtrigintillion nine hundred and ninety nine cenoctotrigintillion nine hundred and ninety nine censeptentrigintillion nine hundred and ninety nine censextrigintillion nine hundred and ninety nine cenquintrigintillion nine hundred and ninety nine cenquattuortrigintillion nine hundred and ninety nine centretrigintillion nine hundred and ninety nine cendotrigintillion nine hundred and ninety nine cenuntrigintillion nine hundred and ninety nine centrigintillion nine hundred and ninety nine cennovemvigintillion nine hundred and ninety nine cenoctovigintillion nine hundred and ninety nine censeptenvigintillion nine hundred and ninety nine censexvigintillion nine hundred and ninety nine cenquinvigintillion nine hundred and ninety nine cenquattuorvigintillion nine hundred and ninety nine centrevigintillion nine hundred and ninety nine cendovigintillion nine hundred and ninety nine cenunvigintillion nine hundred and ninety nine cenvigintillion nine hundred and ninety nine cennovemdecillion nine hundred and ninety nine cenoctodecillion nine hundred and ninety nine censeptendecillion nine hundred and ninety nine censexdecillion nine hundred and ninety nine cenquindecillion nine hundred and ninety nine cenquattuordecillion nine hundred and ninety nine centredecillion nine hundred and ninety nine cendodecillion nine hundred and ninety nine cenundecillion nine hundred and ninety nine cendecillion nine hundred and ninety nine cennovemtillion nine hundred and ninety nine cenoctotillion nine hundred and ninety nine censeptentillion nine hundred and ninety nine censextillion nine hundred and ninety nine cenquintillion nine hundred and ninety nine cenquattuortillion nine hundred and ninety nine centretillion nine hundred and ninety nine cendotillion nine hundred and ninety nine cenuntillion nine hundred and ninety nine centillion nine hundred and ninety nine novemnonagintillion nine hundred and ninety nine octanonagintillion nine hundred and ninety nine septennonagintillion nine hundred and ninety nine sexnonagintillion nine hundred and ninety nine quinnonagintillion nine hundred and ninety nine quattuornonagintillion nine hundred and ninety nine trenonagintillion nine hundred and ninety nine duononagintillion nine hundred and ninety nine unnonagintillion nine hundred and ninety nine nonagintillion nine hundred and ninety nine novemoctogintillion nine hundred and ninety nine octaoctogintillion nine hundred and ninety nine septenoctogintillion nine hundred and ninety nine sexoctogintillion nine hundred and ninety nine quinoctogintillion nine hundred and ninety nine quattuoroctogintillion nine hundred and ninety nine treoctogintillion nine hundred and ninety nine duooctogintillion nine hundred and ninety nine unoctogintillion nine hundred and ninety nine octagintillion nine hundred and ninety nine novemseptuagintillion nine hundred and ninety nine octaseptuagintillion nine hundred and ninety nine septenseptuagintillion nine hundred and ninety nine sexseptuagintillion nine hundred and ninety nine quinseptuagintillion nine hundred and ninety nine quattuorseptuagintillion nine hundred and ninety nine treseptuagintillion nine hundred and ninety nine duoseptuagintillion nine hundred and ninety nine unseptuagintillion nine hundred and ninety nine septuagintillion nine hundred and ninety nine novemsexagintillion nine hundred and ninety nine octasexagintillion nine hundred and ninety nine septensexagintillion nine hundred and ninety nine sexsexagintillion nine hundred and ninety nine quinsexagintillion nine hundred and ninety nine quattuorsexagintillion nine hundred and ninety nine tresexagintillion nine hundred and ninety nine duosexagintillion nine hundred and ninety nine unsexagintillion nine hundred and ninety nine sexagintillion nine hundred and ninety nine novemquinquagintillion nine hundred and ninety nine octaquinquagintillion nine hundred and ninety nine septenquinquagintillion nine hundred and ninety nine sexquinquagintillion nine hundred and ninety nine quinquinquagintillion nine hundred and ninety nine quattuorquinquagintillion nine hundred and ninety nine trequinquagintillion nine hundred and ninety nine duoquinquagintillion nine hundred and ninety nine unquinquagintillion nine hundred and ninety nine quinquagintillion nine hundred and ninety nine novemquadragintillion nine hundred and ninety nine octaquadragintillion nine hundred and ninety nine septenquadragintillion nine hundred and ninety nine sexquadragintillion nine hundred and ninety nine quinquadragintillion nine hundred and ninety nine quattuorquadragintillion nine hundred and ninety nine trequadragintillion nine hundred and ninety nine duoquadragintillion nine hundred and ninety nine unquadragintillion nine hundred and ninety nine quadragintillion nine hundred and ninety nine novemtrigintillion nine hundred and ninety nine octotrigintillion nine hundred and ninety nine septentrigintillion nine hundred and ninety nine sextrigintillion nine hundred and ninety nine quintrigintillion nine hundred and ninety nine quattuortrigintillion nine hundred and ninety nine tretrigintillion nine hundred and ninety nine duotrigintillion nine hundred and ninety nine untrigintillion nine hundred and ninety nine trigintillion nine hundred and ninety nine novemvigintillion nine hundred and ninety nine octavigintillion nine hundred and ninety nine septenvigintillion nine hundred and ninety nine sexvigintillion nine hundred and ninety nine quinvigintillion nine hundred and ninety nine quattuorvigintillion nine hundred and ninety nine trevigintillion nine hundred and ninety nine duovigintillion nine hundred and ninety nine unvigintillion nine hundred and ninety nine vigintillion nine hundred and ninety nine novemdecillion nine hundred and ninety nine octodecillion nine hundred and ninety nine septendecillion nine hundred and ninety nine sexdecillion nine hundred and ninety nine quindecillion nine hundred and ninety nine quattuordecillion nine hundred and ninety nine tredecillion nine hundred and ninety nine duodecillion nine hundred and ninety nine undecillion nine hundred and ninety nine decillion nine hundred and ninety nine nonillion nine hundred and ninety nine octillion nine hundred and ninety nine septillion nine hundred and ninety nine sextillion nine hundred and ninety nine quintillion nine hundred and ninety nine quadrillion nine hundred and ninety nine trillion nine hundred and ninety nine billion nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine point nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine");
assertEqual(ba.toString(), "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999.99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");

ba = new BigArith("one hundred");
assertEqual(ba.toString(), "100");

ba = new BigArith("one hundred thousand");
assertEqual(ba.toString(), "100000");

ba = new BigArith("ONE HUNDRED NINETY THREE THOUSAND");
assertEqual(ba.toString(), "193000");

//Constant
ba = new BigArith("PI");
assertEqual(ba.toString(), "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196");

ba = new BigArith("SQRT2");
assertEqual(ba.toString(), "1.41421356237309504880168872420969807856967187537694807317667973799073247846210703885038753432764157273501384623091229702492483605585073721264412149709993583141322266592750559275579995050115278206057147");

//even with another BigArith object
var bb = new BigArith("3446373674636365635716281636262635"); 
var bc = new BigArith(bb);
assertEqual(bc.toString(), "3446373674636365635716281636262635");


//NaN
ba = new BigArith("3.8.7");
assertIsNaN(ba.toString());

ba = new BigArith("point twelve");
assertIsNaN(ba.toString());

ba = new BigArith("thirty point one eight point three");
assertIsNaN(ba.toString());

ba = new BigArith("one ninety nine");
assertIsNaN(ba.toString());

ba = new BigArith("one ten two");
assertIsNaN(ba.toString());