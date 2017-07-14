console.log("%cTesting for toWords", "color: blue; font-size: 20pt;");

/*toWords function*/

var ba = new BigArith(); 
assertEqual(ba.toWords(), "zero");

ba = new BigArith(""); 
assertEqual(ba.toWords(), "zero");

ba = new BigArith(1); 
assertEqual(ba.toWords(), "one");

ba = new BigArith(123);
assertEqual(ba.toWords(), "one hundred and twenty three");

ba = new BigArith(5e3);
assertEqual(ba.toWords(), "five thousand");

ba = new BigArith(1007);
assertEqual(ba.toWords(), "one thousand seven");

ba = new BigArith(1000789760);
assertEqual(ba.toWords(), "one billion seven hundred and eighty nine thousand seven hundred and sixty");

ba = new BigArith(Number.MAX_SAFE_INTEGER);
assertEqual(ba.toWords(), "nine quadrillion seven trillion one hundred and ninety nine billion two hundred and fifty four million seven hundred and forty thousand nine hundred and ninety one");

ba = new BigArith(Number.MIN_SAFE_INTEGER);
assertEqual(ba.toWords(), "negative nine quadrillion seven trillion one hundred and ninety nine billion two hundred and fifty four million seven hundred and forty thousand nine hundred and ninety one");

ba = new BigArith("0.5");
assertEqual(ba.toWords(), "zero point five");

ba = new BigArith("-34"); 
assertEqual(ba.toWords(), "negative thirty four");

ba = new BigArith("+34");
assertEqual(ba.toWords(), "thirty four");

ba = new BigArith(".34");
assertEqual(ba.toWords(), "zero point three four");

ba = new BigArith("twenty five point three eight"); 
assertEqual(ba.toWords(), "twenty five point three eight");


ba = new BigArith("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999.99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
assertEqual(ba.toWords(), "nine hundred and ninety nine trecentretrigintillion nine hundred and ninety nine trecendotrigintillion nine hundred and ninety nine trecenuntrigintillion nine hundred and ninety nine trecentrigintillion nine hundred and ninety nine trecennovemvigintillion nine hundred and ninety nine trecenoctovigintillion nine hundred and ninety nine trecenseptenvigintillion nine hundred and ninety nine trecensexvigintillion nine hundred and ninety nine trecenquinvigintillion nine hundred and ninety nine trecenquattuorvigintillion nine hundred and ninety nine trecentrevigintillion nine hundred and ninety nine trecendovigintillion nine hundred and ninety nine trecenunvigintillion nine hundred and ninety nine trecenvigintillion nine hundred and ninety nine trecennovemdecillion nine hundred and ninety nine trecenoctodecillion nine hundred and ninety nine trecenseptendecillion nine hundred and ninety nine trecensexdecillion nine hundred and ninety nine trecenquindecillion nine hundred and ninety nine trecenquattuordecillion nine hundred and ninety nine trecentredecillion nine hundred and ninety nine trecendodecillion nine hundred and ninety nine trecenundecillion nine hundred and ninety nine trecendecillion nine hundred and ninety nine trecennovemtillion nine hundred and ninety nine trecenoctotillion nine hundred and ninety nine trecenseptentillion nine hundred and ninety nine trecensextillion nine hundred and ninety nine trecenquintillion nine hundred and ninety nine trecenquattuortillion nine hundred and ninety nine trecentretillion nine hundred and ninety nine trecendotillion nine hundred and ninety nine trecenuntillion nine hundred and ninety nine trecentillion nine hundred and ninety nine duocennovemnonagintillion nine hundred and ninety nine duocenoctononagintillion nine hundred and ninety nine duocenseptennonagintillion nine hundred and ninety nine duocensexnonagintillion nine hundred and ninety nine duocenquinnonagintillion nine hundred and ninety nine duocenquattuornonagintillion nine hundred and ninety nine duocentrenonagintillion nine hundred and ninety nine duocendononagintillion nine hundred and ninety nine duocenunnonagintillion nine hundred and ninety nine duocennonagintillion nine hundred and ninety nine duocennovemoctogintillion nine hundred and ninety nine duocenoctooctogintillion nine hundred and ninety nine duocenseptenoctogintillion nine hundred and ninety nine duocensexoctogintillion nine hundred and ninety nine duocenquinoctogintillion nine hundred and ninety nine duocenquattuoroctogintillion nine hundred and ninety nine duocentreoctogintillion nine hundred and ninety nine duocendooctogintillion nine hundred and ninety nine duocenunoctogintillion nine hundred and ninety nine duocenoctogintillion nine hundred and ninety nine duocennovemseptuagintillion nine hundred and ninety nine duocenoctoseptuagintillion nine hundred and ninety nine duocenseptenseptuagintillion nine hundred and ninety nine duocensexseptuagintillion nine hundred and ninety nine duocenquinseptuagintillion nine hundred and ninety nine duocenquattuorseptuagintillion nine hundred and ninety nine duocentreseptuagintillion nine hundred and ninety nine duocendoseptuagintillion nine hundred and ninety nine duocenunseptuagintillion nine hundred and ninety nine duocenseptuagintillion nine hundred and ninety nine duocennovemsexagintillion nine hundred and ninety nine duocenoctosexagintillion nine hundred and ninety nine duocenseptensexagintillion nine hundred and ninety nine duocensexsexagintillion nine hundred and ninety nine duocenquinsexagintillion nine hundred and ninety nine duocenquattuorsexagintillion nine hundred and ninety nine duocentresexagintillion nine hundred and ninety nine duocendosexagintillion nine hundred and ninety nine duocenunsexagintillion nine hundred and ninety nine duocensexagintillion nine hundred and ninety nine duocennovemquinquagintillion nine hundred and ninety nine duocenoctoquinquagintillion nine hundred and ninety nine duocenseptenquinquagintillion nine hundred and ninety nine duocensexquinquagintillion nine hundred and ninety nine duocenquinquinquagintillion nine hundred and ninety nine duocenquattuorquinquagintillion nine hundred and ninety nine duocentrequinquagintillion nine hundred and ninety nine duocendoquinquagintillion nine hundred and ninety nine duocenunquinquagintillion nine hundred and ninety nine duocenquinquagintillion nine hundred and ninety nine duocennovemquadragintillion nine hundred and ninety nine duocenoctoquadragintillion nine hundred and ninety nine duocenseptenquadragintillion nine hundred and ninety nine duocensexquadragintillion nine hundred and ninety nine duocenquinquadragintillion nine hundred and ninety nine duocenquattuorquadragintillion nine hundred and ninety nine duocentrequadragintillion nine hundred and ninety nine duocendoquadragintillion nine hundred and ninety nine duocenunquadragintillion nine hundred and ninety nine duocenquadragintillion nine hundred and ninety nine duocennovemtrigintillion nine hundred and ninety nine duocenoctotrigintillion nine hundred and ninety nine duocenseptentrigintillion nine hundred and ninety nine duocensextrigintillion nine hundred and ninety nine duocenquintrigintillion nine hundred and ninety nine duocenquattuortrigintillion nine hundred and ninety nine duocentretrigintillion nine hundred and ninety nine duocendotrigintillion nine hundred and ninety nine duocenuntrigintillion nine hundred and ninety nine duocentrigintillion nine hundred and ninety nine duocennovemvigintillion nine hundred and ninety nine duocenoctovigintillion nine hundred and ninety nine duocenseptenvigintillion nine hundred and ninety nine duocensexvigintillion nine hundred and ninety nine duocenquinvigintillion nine hundred and ninety nine duocenquattuorvigintillion nine hundred and ninety nine duocentrevigintillion nine hundred and ninety nine duocendovigintillion nine hundred and ninety nine duocenunvigintillion nine hundred and ninety nine duocenvigintillion nine hundred and ninety nine duocennovemdecillion nine hundred and ninety nine duocenoctodecillion nine hundred and ninety nine duocenseptendecillion nine hundred and ninety nine duocensexdecillion nine hundred and ninety nine duocenquindecillion nine hundred and ninety nine duocenquattuordecillion nine hundred and ninety nine duocentredecillion nine hundred and ninety nine duocendodecillion nine hundred and ninety nine duocenundecillion nine hundred and ninety nine duocendecillion nine hundred and ninety nine duocennovemtillion nine hundred and ninety nine duocenoctotillion nine hundred and ninety nine duocenseptentillion nine hundred and ninety nine duocensextillion nine hundred and ninety nine duocenquintillion nine hundred and ninety nine duocenquattuortillion nine hundred and ninety nine duocentretillion nine hundred and ninety nine duocendotillion nine hundred and ninety nine duocenuntillion nine hundred and ninety nine duocentillion nine hundred and ninety nine cennovemnonagintillion nine hundred and ninety nine cenoctononagintillion nine hundred and ninety nine censeptennonagintillion nine hundred and ninety nine censexnonagintillion nine hundred and ninety nine cenquinnonagintillion nine hundred and ninety nine cenquattuornonagintillion nine hundred and ninety nine centrenonagintillion nine hundred and ninety nine cendononagintillion nine hundred and ninety nine cenunnonagintillion nine hundred and ninety nine cennonagintillion nine hundred and ninety nine cennovemoctogintillion nine hundred and ninety nine cenoctooctogintillion nine hundred and ninety nine censeptenoctogintillion nine hundred and ninety nine censexoctogintillion nine hundred and ninety nine cenquinoctogintillion nine hundred and ninety nine cenquattuoroctogintillion nine hundred and ninety nine centreoctogintillion nine hundred and ninety nine cendooctogintillion nine hundred and ninety nine cenunoctogintillion nine hundred and ninety nine cenoctogintillion nine hundred and ninety nine cennovemseptuagintillion nine hundred and ninety nine cenoctoseptuagintillion nine hundred and ninety nine censeptenseptuagintillion nine hundred and ninety nine censexseptuagintillion nine hundred and ninety nine cenquinseptuagintillion nine hundred and ninety nine cenquattuorseptuagintillion nine hundred and ninety nine centreseptuagintillion nine hundred and ninety nine cendoseptuagintillion nine hundred and ninety nine cenunseptuagintillion nine hundred and ninety nine censeptuagintillion nine hundred and ninety nine cennovemsexagintillion nine hundred and ninety nine cenoctosexagintillion nine hundred and ninety nine censeptensexagintillion nine hundred and ninety nine censexsexagintillion nine hundred and ninety nine cenquinsexagintillion nine hundred and ninety nine cenquattuorsexagintillion nine hundred and ninety nine centresexagintillion nine hundred and ninety nine cendosexagintillion nine hundred and ninety nine cenunsexagintillion nine hundred and ninety nine censexagintillion nine hundred and ninety nine cennovemquinquagintillion nine hundred and ninety nine cenoctoquinquagintillion nine hundred and ninety nine censeptenquinquagintillion nine hundred and ninety nine censexquinquagintillion nine hundred and ninety nine cenquinquinquagintillion nine hundred and ninety nine cenquattuorquinquagintillion nine hundred and ninety nine centrequinquagintillion nine hundred and ninety nine cendoquinquagintillion nine hundred and ninety nine cenunquinquagintillion nine hundred and ninety nine cenquinquagintillion nine hundred and ninety nine cennovemquadragintillion nine hundred and ninety nine cenoctoquadragintillion nine hundred and ninety nine censeptenquadragintillion nine hundred and ninety nine censexquadragintillion nine hundred and ninety nine cenquinquadragintillion nine hundred and ninety nine cenquattuorquadragintillion nine hundred and ninety nine centrequadragintillion nine hundred and ninety nine cendoquadragintillion nine hundred and ninety nine cenunquadragintillion nine hundred and ninety nine cenquadragintillion nine hundred and ninety nine cennovemtrigintillion nine hundred and ninety nine cenoctotrigintillion nine hundred and ninety nine censeptentrigintillion nine hundred and ninety nine censextrigintillion nine hundred and ninety nine cenquintrigintillion nine hundred and ninety nine cenquattuortrigintillion nine hundred and ninety nine centretrigintillion nine hundred and ninety nine cendotrigintillion nine hundred and ninety nine cenuntrigintillion nine hundred and ninety nine centrigintillion nine hundred and ninety nine cennovemvigintillion nine hundred and ninety nine cenoctovigintillion nine hundred and ninety nine censeptenvigintillion nine hundred and ninety nine censexvigintillion nine hundred and ninety nine cenquinvigintillion nine hundred and ninety nine cenquattuorvigintillion nine hundred and ninety nine centrevigintillion nine hundred and ninety nine cendovigintillion nine hundred and ninety nine cenunvigintillion nine hundred and ninety nine cenvigintillion nine hundred and ninety nine cennovemdecillion nine hundred and ninety nine cenoctodecillion nine hundred and ninety nine censeptendecillion nine hundred and ninety nine censexdecillion nine hundred and ninety nine cenquindecillion nine hundred and ninety nine cenquattuordecillion nine hundred and ninety nine centredecillion nine hundred and ninety nine cendodecillion nine hundred and ninety nine cenundecillion nine hundred and ninety nine cendecillion nine hundred and ninety nine cennovemtillion nine hundred and ninety nine cenoctotillion nine hundred and ninety nine censeptentillion nine hundred and ninety nine censextillion nine hundred and ninety nine cenquintillion nine hundred and ninety nine cenquattuortillion nine hundred and ninety nine centretillion nine hundred and ninety nine cendotillion nine hundred and ninety nine cenuntillion nine hundred and ninety nine centillion nine hundred and ninety nine novemnonagintillion nine hundred and ninety nine octanonagintillion nine hundred and ninety nine septennonagintillion nine hundred and ninety nine sexnonagintillion nine hundred and ninety nine quinnonagintillion nine hundred and ninety nine quattuornonagintillion nine hundred and ninety nine trenonagintillion nine hundred and ninety nine duononagintillion nine hundred and ninety nine unnonagintillion nine hundred and ninety nine nonagintillion nine hundred and ninety nine novemoctogintillion nine hundred and ninety nine octaoctogintillion nine hundred and ninety nine septenoctogintillion nine hundred and ninety nine sexoctogintillion nine hundred and ninety nine quinoctogintillion nine hundred and ninety nine quattuoroctogintillion nine hundred and ninety nine treoctogintillion nine hundred and ninety nine duooctogintillion nine hundred and ninety nine unoctogintillion nine hundred and ninety nine octagintillion nine hundred and ninety nine novemseptuagintillion nine hundred and ninety nine octaseptuagintillion nine hundred and ninety nine septenseptuagintillion nine hundred and ninety nine sexseptuagintillion nine hundred and ninety nine quinseptuagintillion nine hundred and ninety nine quattuorseptuagintillion nine hundred and ninety nine treseptuagintillion nine hundred and ninety nine duoseptuagintillion nine hundred and ninety nine unseptuagintillion nine hundred and ninety nine septuagintillion nine hundred and ninety nine novemsexagintillion nine hundred and ninety nine octasexagintillion nine hundred and ninety nine septensexagintillion nine hundred and ninety nine sexsexagintillion nine hundred and ninety nine quinsexagintillion nine hundred and ninety nine quattuorsexagintillion nine hundred and ninety nine tresexagintillion nine hundred and ninety nine duosexagintillion nine hundred and ninety nine unsexagintillion nine hundred and ninety nine sexagintillion nine hundred and ninety nine novemquinquagintillion nine hundred and ninety nine octaquinquagintillion nine hundred and ninety nine septenquinquagintillion nine hundred and ninety nine sexquinquagintillion nine hundred and ninety nine quinquinquagintillion nine hundred and ninety nine quattuorquinquagintillion nine hundred and ninety nine trequinquagintillion nine hundred and ninety nine duoquinquagintillion nine hundred and ninety nine unquinquagintillion nine hundred and ninety nine quinquagintillion nine hundred and ninety nine novemquadragintillion nine hundred and ninety nine octaquadragintillion nine hundred and ninety nine septenquadragintillion nine hundred and ninety nine sexquadragintillion nine hundred and ninety nine quinquadragintillion nine hundred and ninety nine quattuorquadragintillion nine hundred and ninety nine trequadragintillion nine hundred and ninety nine duoquadragintillion nine hundred and ninety nine unquadragintillion nine hundred and ninety nine quadragintillion nine hundred and ninety nine novemtrigintillion nine hundred and ninety nine octotrigintillion nine hundred and ninety nine septentrigintillion nine hundred and ninety nine sextrigintillion nine hundred and ninety nine quintrigintillion nine hundred and ninety nine quattuortrigintillion nine hundred and ninety nine tretrigintillion nine hundred and ninety nine duotrigintillion nine hundred and ninety nine untrigintillion nine hundred and ninety nine trigintillion nine hundred and ninety nine novemvigintillion nine hundred and ninety nine octavigintillion nine hundred and ninety nine septenvigintillion nine hundred and ninety nine sexvigintillion nine hundred and ninety nine quinvigintillion nine hundred and ninety nine quattuorvigintillion nine hundred and ninety nine trevigintillion nine hundred and ninety nine duovigintillion nine hundred and ninety nine unvigintillion nine hundred and ninety nine vigintillion nine hundred and ninety nine novemdecillion nine hundred and ninety nine octodecillion nine hundred and ninety nine septendecillion nine hundred and ninety nine sexdecillion nine hundred and ninety nine quindecillion nine hundred and ninety nine quattuordecillion nine hundred and ninety nine tredecillion nine hundred and ninety nine duodecillion nine hundred and ninety nine undecillion nine hundred and ninety nine decillion nine hundred and ninety nine nonillion nine hundred and ninety nine octillion nine hundred and ninety nine septillion nine hundred and ninety nine sextillion nine hundred and ninety nine quintillion nine hundred and ninety nine quadrillion nine hundred and ninety nine trillion nine hundred and ninety nine billion nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine point nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine nine");

ba = new BigArith("999000123");
assertEqual(ba.toWords(), "nine hundred and ninety nine million one hundred and twenty three");

ba = new BigArith("PI");
assertEqual(ba.toWords(), "three point one four one five nine two six five three five eight nine seven nine three two three eight four six two six four three three eight three two seven nine five zero two eight eight four one nine seven one six nine three nine nine three seven five one zero five eight two zero nine seven four nine four four five nine two three zero seven eight one six four zero six two eight six two zero eight nine nine eight six two eight zero three four eight two five three four two one one seven zero six seven nine eight two one four eight zero eight six five one three two eight two three zero six six four seven zero nine three eight four four six zero nine five five zero five eight two two three one seven two five three five nine four zero eight one two eight four eight one one one seven four five zero two eight four one zero two seven zero one nine three eight five two one one zero five five five nine six four four six two two nine four eight nine five four nine three zero three eight one nine six");


ba = new BigArith("SQRT2");
assertEqual(ba.toWords(), "one point four one four two one three five six two three seven three zero nine five zero four eight eight zero one six eight eight seven two four two zero nine six nine eight zero seven eight five six nine six seven one eight seven five three seven six nine four eight zero seven three one seven six six seven nine seven three seven nine nine zero seven three two four seven eight four six two one zero seven zero three eight eight five zero three eight seven five three four three two seven six four one five seven two seven three five zero one three eight four six two three zero nine one two two nine seven zero two four nine two four eight three six zero five five eight five zero seven three seven two one two six four four one two one four nine seven zero nine nine nine three five eight three one four one three two two two six six five nine two seven five zero five five nine two seven five five seven nine nine nine five zero five zero one one five two seven eight two zero six zero five seven one four seven");



//Throw error
ba = new BigArith("99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999.999");
assertThrowError(ba.toWords, []);