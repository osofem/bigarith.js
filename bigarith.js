/**	
*	bigarith.js - Written by Oso Oluwafemi Ebenezer
*	The constructor for BigArith
*	@param {string|number|null|BigArith} n Accepts no parameter, or number within the safe integer limit or string in "-123.456" form or  
*	"negative one hundred and twenty three point four five six" form or a constant "PI" form or a BigArith object
*	Dependent on verify(), getter name()
*/
var BigArith=function(n){
	//version
	Object.defineProperty(this, 'version', {
		enumerable: true,
		writable: false,
		value: "v0.0.5",
	});
	
	//Object name
	Object.defineProperty(this, 'name', {
		enumerable: true,
		writable: false,
		value: "BigArith"
	});
	
	//Word length support 
	Object.defineProperty(this, 'wordSupport', {
		writable: false,
		value: 1002 //up to (1x10^1,005) - 0.0{199}1
	});
	
	//Word decimal length support 
	Object.defineProperty(this, 'decimalSupport', {
		writable: false,
		value: 200 //200 decimal characters when using toWords()
	});
	
	//assign this.value
	if(n == null) this.value = "0"
	else if(typeof n == "object" && n.name == "BigArith") this.value = n.toString();
	else if(typeof n == "undefined" || n == "") this.value = "0";
	else if(n == "PI") this.value = "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196";
	else if(n == "E") this.value = "2.71828182845904523536028747135266249775724709369995957496696762772407663035354759457138217852516642742746639193200305992181741359662904357290033429526059563073813232862794349076323382988075319525101901";
	/*else if(n == "LN2") this.value = "0.6931471805599453";
	else if(n == "LN10") this.value = "2.302585092994046";
	else if(n == "LOG2E") this.value = "1.4426950408889634";
	else if(n == "LOG10E") this.value = "0.4342944819032518";*/
	else if(n == "SQRT1_2") this.value = "0.70710678118654752440084436210484903928483593768847403658833986899536623923105351942519376716382078636750692311545614851246241802792536860632206074854996791570661133296375279637789997525057639103028574";
	else if(n == "SQRT2") this.value = "1.41421356237309504880168872420969807856967187537694807317667973799073247846210703885038753432764157273501384623091229702492483605585073721264412149709993583141322266592750559275579995050115278206057147";
	else this.value = this.verify(n);
};

/**	
*	Verify input evaluate to a valid number
*	function verify
*	@param {string|number|BigArth} n Number within the safe integer limit or string in "-123.456" or  
*	"negative one hundred and twenty three point four five six" form or a BigArith object
*	@returns {string|NaN} - A string representation of @param in form "-123.456" or NaN if @param is not valid,
*	or throws an error if input is in number form but not within safe limits.
*	Dependent on w_Dict()
*/
BigArith.prototype.verify = function(n){
	//Can be already verified BigArith object
	if(typeof(n) == "object" && n.name == "BigArith")
		return n.toString();
		
	//Can be a number in form of 1000 or 1e3
	if(typeof(n) == 'number' && n <= Number.MAX_SAFE_INTEGER && n >= Number.MIN_SAFE_INTEGER)//Number must be within the safe integer range
		return n.toString();
	if(typeof(n) == 'number' && (n > Number.MAX_SAFE_INTEGER || n < Number.MIN_SAFE_INTEGER))
		throw new RangeError("The number you entered in typeof 'number' form is not within the safe limit. Please enter the number as a string.");
	
	//It can be string in form "-123.89"
	if(typeof(n) == 'string' && /\d/.test(n)/*This just test if it contains any digit, real test in below*/){
		n = n.replace(/^\s|\s$/g, "");
		var sign = false;
		if(n[0] == "-"){
			sign = true;
			n = n.slice(1, n.length);
		}
		else if(n[0] == "+"){
			n = n.slice(1, n.length);
		}
		
		n = n.split(".");
		if(n.length > 2)
			return NaN;
		if(n[0] == "")
			n[0] = "0";
		if(typeof(n[1]) == 'undefined')
			n[1] = "0";
		if(/^\d+$/.test(n[0]) && /^\d+$/.test(n[1])/*Test that it contains only digits*/){
			//Remove unnecessary zeros
			n[0] = n[0].replace(/^[0]+/g, "");
			n[1] = n[1].replace(/[0]+$/g, "");
			return ((sign)?"-":"") + ((n[0] == "")? "0":n[0]) + ((n[1] == "")?"":"."+n[1]);
		}
		else
			return NaN;
	}
	
	//It can be string in form of "negative one thousand point one two"
	if(typeof(n) == 'string'){
		n = n.toLowerCase();
		n = n.replace(/^\s|\s$/g, "").replace(/\s+/g, " ");
		n = n.replace(/\s(and)\s/g, " ");
		
		var fNum, dNum = fNum =  "";
		
		//Is Negative?
		var sign = false;
		n = n.split(" ");
		if(n[0] == "negative"){
			sign = true;
			n.shift();
		}
		else if(n[0] == "positive"){
			n.shift();
		}
		
		//The Mantissa part
		if(n.indexOf("point") >= 0){
			var decimal = n.splice(n.indexOf("point"), n.length - n.indexOf("point")); decimal.shift();
			dNum = decimal.map(a=>{return typeof this.w_Dict(a) != "undefined"&&this.w_Dict(a).length<2&&this.w_Dict(a).length>0?this.w_Dict(a):NaN}).join("");
		}
		else dNum = "0";
		
		//The Characteristic part
		if(n.includes("zero") && n.lastIndexOf("zero") != 0) return NaN;
		var subArray = [];
		var subString = "";
		var prevSuffix = "0".repeat(this.wordSupport);
		var prevHSuffix = false;
		var prevValue = false;
		for(var i = 0; i < n.length; i++){
			if(typeof(this.w_Dict(n[i])) == 'undefined')return NaN; //Spelling errors and what-nots
			if(this.w_Dict(n[i]).length >= 3/*thousand and above*/){
				if(prevSuffix.length < this.w_Dict(n[i]).length) return NaN; //"one million three billion" is wrong
				if(!prevValue) return NaN; //"one million thousnad" is wrong
				subString += this.w_Dict(n[i]);
				subArray.push(subString);
				subString = "";
				prevSuffix = this.w_Dict(n[i]);
				prevValue = false;
				prevHSuffix = false;
			}
			else if(n[i] == "hundred"){
				if(prevHSuffix) return NaN; // "one hundred two hundred" is wrong
				if(typeof this.w_Dict(n[i-1]) == 'undefined') return NaN; //"hundred thousand" is wrong
				if(this.w_Dict(n[i-1]).length > 1) return NaN; 
				subString += this.w_Dict(n[i]);
				prevHSuffix = true;
			}
			else{
				if(typeof this.w_Dict(n[i-1])!='undefined'&&(this.w_Dict(n[i]).length>this.w_Dict(n[i-1]).length||(this.w_Dict(n[i]).length==1&&this.w_Dict(n[i-1]).length==1))) return NaN; //one ninety is wrong, eight hundred and six three
				subString = subString.substr(0, subString.length - this.w_Dict(n[i]).length) + this.w_Dict(n[i]);
				prevValue = true;
			}
		}
		subArray.push(subString);
		for(var i = 0; i < subArray.length; i++){
			fNum = fNum.substr(0, fNum.length - subArray[i].length) + subArray[i];
		}
		if(fNum == "") fNum = "0";
		
		//output
		if(/^\d+$/.test(fNum) && /^\d+$/.test(dNum)/*Test that it contains only digits*/){
			//Remove unnecessary zeros
			fNum = fNum.replace(/^[0]+/g, "");
			dNum = dNum.replace(/[0]+$/g, "");
			return (sign?"-":"") + ((fNum == "")?"0":fNum) + ((dNum == "")?"":"."+dNum);
		}
		else return NaN;
	}
	
	//That's all we support
	return NaN;
};

/** 
*	Returns the this.value as a number
*	@return {number} - this.value
*/
BigArith.prototype.valueOf=function(){
	return this.value*1;
};

/** 
*	Returns the this.value as a string
*	@return {string} - this.value
*/
BigArith.prototype.toString=function(){
	return this.value;
};


/** 
*	Returns true if this.value is negative, false otherwise
*	@return {boolean} - this.value is less than positive zero
*/
BigArith.prototype.isNegative=function(){
	if(isNaN(this.value)) return NaN;
	if(this.value[0] == "-") return true;
	return false;
}
	
/** 
*	Returns true if this.value is positive, false otherwise
*	@return {boolean} - this.value is greater than negative zero
*/
BigArith.prototype.isPositive=function(){
	if(isNaN(this.value)) return NaN;
	if(this.value[0] == "-") return false;
	return true;
}

/** 
*	Returns true if this.value is integer, false otherwise
*	@return {boolean} - this.value is integer?
*/
BigArith.prototype.isInteger=function(){
	if(isNaN(this.value)) return NaN;
	if(this.value.indexOf(".") == -1) return true;
	return false;
}

/** 
*	Returns true if this.value is even, false otherwise
*	@return {boolean} - this.value is even?
*/
BigArith.prototype.isEven=function(){
	if(isNaN(this.value)) return NaN;
	var d = new BigArith(this.value);
	if(!d.isInteger()) return false;
	d = BigArith.divide(this.value[this.value.length-1], 2);
	if(BigArith.compare(d, d.floor()) == 0) return true;
	return false;
}

/** 
*	Returns true if this.value is NOT even and is an integer, false otherwise
*	@return {boolean} - this.value is NOT even and is an integer?
*/
BigArith.prototype.isOdd=function(){
	if(isNaN(this.value)) return NaN;
	var d = new BigArith(this.value);
	if(!d.isEven() && d.isInteger()) return true;
	return false;
}

/** 
*	Returns square of this.value
*	function square
*	@return {BigArith} - product of this.value and this.value
*/
BigArith.prototype.square=function(){
	return BigArith.multiply(this.value, this.value);
}

/** [NEEDS OPTIMIZATION - n tends to gets very large within few calculations and this slows down calculation speed. Takes 9105ms to calculate sqrt 2 to 200 decimal place]
*	Returns square root of this.value
*	function squareRoot
*	@return {BigArith} - root of this.value
*/
BigArith.prototype.squareRoot=function(){
	if(isNaN(this.value) || new BigArith(this.value).isNegative()) return NaN;
	var n = this.value;
	
	//Find the perfect square just less than or equal to n
	var ps = BigArith.perfectSq(n); 
	var result = ps;
	var quotient = ps;
	n = BigArith.subtract(n, BigArith.multiply(ps, ps));
	//If reminder is 0, return result we have reached the end of calculation
	if(BigArith.compare(n, 0) == 0) return new BigArith(result);
	
	//If we got here that means we have reminders
	n = BigArith.multiply(n, 100); //multiply reminder by 100
	result +=  ".";
	for(var count = 0; count <= new BigArith().decimalSupport+1; count++){
		// take quotient double it and multiply by 10
		var j = BigArith.multiply(quotient, 20); 
		
		//Find a number bewteen j+1 and j+9 such that (j+i)*i will just be less than or equal to n
		var i = 1;
		for(; i <= 9; i++){
			var g = BigArith.multiply(BigArith.add(j,i), i); //(j+i)*i
			if(BigArith.compare(g, n) >= 0 || BigArith.compare(n, 0) == 0) break;
		}
		//If (j+i)*i > n or i == 10, reduce i by 1
		var ji = BigArith.multiply(BigArith.add(j,i), i); //(j+i)*i
		if(i == 10 || BigArith.compare(BigArith.multiply(BigArith.add(j,i), i), n) == 1) i--;
		
		n =  BigArith.multiply(BigArith.subtract(n, BigArith.multiply(BigArith.add(j,i), i)),100);//(n-(j+i)*i)*100;
		result += i;
		quotient += i.toString();
		
		//If reminder is 0, break we have reached the end of calculation
		if(BigArith.compare(n, 0) == 0) break;
	}
	return new BigArith(new BigArith(result).toFixed(new BigArith().decimalSupport));
}

/** [NEEDS OPTIMIZATION - incase n is very large]
*	Returns the square root of the perfect square just below or equals to n
* 	function perfectSq
*	@param - {string|number|BigArth} n The number to find the perfect square before
*	@return {string} - the perfect square just less than n or n if it is a perfect square
*/
BigArith.perfectSq=function(n){
	var n = new BigArith(n).toString();
	//start counting from 1 to we get to i*i<=n
	//This is not the best idea if n is very large
	var i = new BigArith(1);
	while(true){
		if(BigArith.compare(new BigArith(i).square(), n) >= 0) break; 
		i = BigArith.add(i, 1);
	} 
	return (BigArith.compare(BigArith.multiply(i, i), n) == 0)?i.toString():i.subtract(1).toString(); 
}

/**	
*	Return the absolute value of this.value
*	function abs
*	@returns {BigArith} - Absolute value of this.value
*	Dependent on static abs()
*/
BigArith.prototype.abs=function(){
	return BigArith.abs(this.value);
}

/**	
*	Return the absolute value of n
*	function abs
*	@param {string|number|BigArth} n value to find absolute of.
*	@returns {BigArith} - Absolute value of n
*	Dependent on isNegative(), negate(), isNaN() (native)
*/
BigArith.abs=function(n){
	var n=new BigArith(n);
	if(isNaN(n)) return NaN;
	return (n.isNegative())?n.negate():n;
}

/**	
*	Returns a number with it sign changed
*	function negate
*	@returns {BigArith} - this.value with the sign changed
*	Dependent on static negate()
*/
BigArith.prototype.negate=function(){
	return BigArith.negate(this.value);
}

/**	
*	Returns a number with it sign changed
*	function negate
*	@param {string|number|BigArth} n number to negate
*	@returns {BigArith} - number with the sign changed
*	Dependent toString()
*/
BigArith.negate=function(n){
	var n = new BigArith(n);
	if(isNaN(n)) return NaN;
	return (n.toString()[0] == "-")?new BigArith(n.toString().substr(1)):new BigArith("-"+n);
}

/**	
*	Returns the characteristic part (part before the decimal point) of a number
*	function truncate
*	@returns {BigArith} - characteristic part of the number
*	Dependent static truncate()
*/
BigArith.prototype.truncate=function(){
	return BigArith.truncate(this.value);
}

/**	
*	Returns the characteristic part (part before the decimal point) of a number
*	function truncate
*	@param {string|number|BigArth} n number to truncate
*	@returns {BigArith} - characteristic part of the number
*	Dependent isNaN(), toString(), indexOf()
*/
BigArith.truncate=function(n){
	var n = new BigArith(n);
	if(isNaN(n)) return NaN;
	if(n.toString().indexOf(".") == -1) return n;
	return new BigArith(n.toString().split(".")[0]);
}

/**	
*	Comparing this.value to n
*	function compare
*	@param {string|number|BigArth} n the number this.value is to be compared to. Can be negative and fractional
*	@returns {number}  (-1 if this.value < n), (0 if this.value == n), (1 if this.value > n)
*	Dependent on static compare()
*/
BigArith.prototype.compare=function(n){
	return BigArith.compare(this.value, n);
}
	
/**	
*	Comparing a to b
*	function compare
*	@param {string|number|BigArth} a number to be compared. Can be negative and fractional
*	@param {string|number|BigArth} b number to be compared. Can be negative and fractional
*	@returns {number} - (-1 if a < b), (0 if a == b), (1 if a > b)
*	Dependent on toString(), isNegative(), isPositive(), abs(), Math.max() (can't use BigArith.max, it's dependent on compare)
*/
BigArith.compare=function(a, b){
	var a = new BigArith(a);
	var b = new BigArith(b);
	if(isNaN(a) || isNaN(b)) return NaN;
	//Check for signs
	var cSign = false, c = "";
	var dSign = false, d = "";
	if(a.isNegative()){
		cSign = true;
		c = a.abs().toString();
	}else c=a.toString();
	if(b.isNegative()){
		dSign = true;
		d = b.abs().toString();
	}else d=b.toString();
	
	c = c.split("."); d = d.split(".");
	(typeof c[1] == 'undefined')?c[1]='0':0;
	(typeof d[1] == 'undefined')?d[1]='0':0;
	
	c[1]=c[1].replace(/[0]*$/g,""); if(c[1] == "") c[1] ="0";
	d[1]=d[1].replace(/[0]*$/g,""); if(d[1] == "") d[1] ="0";
	var max = Math.max(c[1].length, d[1].length);
	c[1] += "0".repeat(max - c[1].length);
	d[1] += "0".repeat(max - d[1].length);
	
	if(cSign && dSign==false) return -1;
	if(dSign && cSign==false) return 1;
	
	if(c[0].length < d[0].length) return (cSign && dSign)?1:-1;
	if(c[0].length > d[0].length) return (cSign && dSign)?-1:1;
  
	//check characteristic
	for(var i = 0; i < c[0].length/*Length is equal so pick one*/; i++){
		if(c[0][i] > d[0][i]) return (cSign && dSign)?-1:1;
		if(c[0][i] < d[0][i]) return (cSign && dSign)?1:-1;
	}
	
	//check mantissa
	for(var i = 0; i < Math.max(c[1].length, d[1].length); i++){
		if(c[1][i] > d[1][i]) return (cSign && dSign)?-1:1;
		if(c[1][i] < d[1][i]) return (cSign && dSign)?1:-1;
	}
	return 0;
}
	
/**	
*	Comparing absolute value of this.value to absolute value of n
*	function compareAbs
*	@param {string|number|BigArth} n value to be comapared with this.value
*	@returns {string} - (-1 if abs(a) < abs(b)) - (0 if abs(a) == abs(b)) - (1 if abs(a) > abs(b))
*	Dependent on static compareAbs() 
*/
BigArith.prototype.compareAbs=function(n){
	return BigArith.compareAbs(this.value, n);
}

/**	
*	Comparing absolute value of a to absolute value of b
*	function compareAbs
*	@param {string|number|BigArth} a value to be compare
*	@param {string|number|BigArth} b value to be compare
*	@returns {string} - (-1 if abs(a) < abs(b)) - (0 if abs(a) == abs(b)) - (1 if abs(a) > abs(b))
*	Dependent on static compare(), abs()
*/
BigArith.compareAbs=function(a, b){
	return BigArith.compare(new BigArith(a).abs(), new BigArith(b).abs());
}

/**	
*	Returns the minimum between this.value and n
*	function min
*	@param {string|number|BigArth} - optional - zero or more parameters
*	@returns {BigArith} - The smallest number between this.value and parameters
*	Dependent on static min() 
*/
BigArith.prototype.min=function(){
	return BigArith.min(this.value, ...arguments);
}

/**	
*	Returns the minimum between a and b
*	function min
*	@param {string|number|BigArth|Array} - optional - zero or more parameters
*	@returns {BigArith} - The smallest number between parameters
*	Dependent on static compare(), valueOf()
*/
BigArith.min=function(){
	var args = BigArith.extract(arguments);
	var result = new BigArith(args[0]);
	for(var i = 0; i < args.length; i++){
		if(isNaN(new BigArith(args[i]).valueOf())) return NaN;
		result = (BigArith.compare(result, args[i]) == -1)?result:new BigArith(args[i]);
	}
	return result;
}

/**	
*	Returns the maximum between this.value and n
*	function max
*	@param {string|number|BigArth} - optional - zero or more parameters
*	@returns {BigArith} - The largest number between this.value and parameters
*	Dependent on static max() 
*/
BigArith.prototype.max=function(){
	return BigArith.max(this.value, ...arguments);
}

/**	
*	Returns the maximum between a and b
*	function max
*	@param {string|number|BigArth|Array} - optional - zero or more parameters
*	@returns {BigArith} - The largest number between parameters
*	Dependent on static compare(), valueOf()
*/
BigArith.max=function(){
	var args = BigArith.extract(arguments);
	var result = new BigArith(args[0]);
	for(var i = 0; i < args.length; i++){
		if(isNaN(new BigArith(args[i]).valueOf())) return NaN;
		result = (BigArith.compare(result, args[i]) == 1)?result:new BigArith(args[i]);
	}
	return result;
}

//TODO
BigArith.extract=function(a){
	var args = [];
	for(var k in a){
		if(typeof a[k] == "number" || typeof a[k] == "string"){args.push(a[k]);}
		else if(typeof a[k] == "object" && a[k].name == "BigArith"){args.push(a[k].toString());}
		else if(typeof a[k] == "object"){args.push(...BigArith.extract(a[k]));}
	}
	return args;
}

/**	
*	Returns largest integer less than or equal to this.value
*	function floor
*	@returns {BigArith} - floored value of this.value
*	Dependent on static floor()
*/
BigArith.prototype.floor=function(){
	return BigArith.floor(this.value);
}


/**	
*	Returns largest integer less than or equal to n
*	function floor
*	@param {string|number|BigArth} n number to floor
*	@returns {BigArith} - floored number
*	Dependent of subtract(), isNegative(), isInteger(), truncate()
*/
BigArith.floor=function(n){
	var n = new BigArith(n);
	if(isNaN(n)) return NaN;
	if(!n.isInteger()){
		n = n.truncate();
		if(n.isNegative()){
			n = BigArith.subtract(n, "1");
		}
	}
	return n;
}

/**	
*	Ceil this.value
*	function ceil
*	@returns {BigArith} - ceiled value of this.value
*	Dependent on static ceil()
*/
BigArith.prototype.ceil=function(){
	return BigArith.ceil(this.value);
}

/**	
*	Returns smallest integer greater than or equals to number
*	function ceil
*	@param {string|number|BigArth} n number to ceil
*	@returns {BigArith} - ceiled number
*	Dependent of static add(), isNegative(), isPositive(), isInteger(), truncate()
*/
BigArith.ceil=function(n){
	var n = new BigArith(n);
	if(isNaN(n)) return NaN;
	if(!n.isInteger()){
		if(n.isPositive())
			n = BigArith.add(n.truncate(), "1");
		else if(n.isNegative())
			n = n.truncate();
	}
	return n;
}

/**	
*	Round this.value to the nearest integer
*	function round
*	@returns {BigArith} - this.value rounded to nearest whole number e.g "1"
*	Dependent on static round()
*/
BigArith.prototype.round=function(){
	return BigArith.round(this.value);
}

/**	
*	Round n to the nearest integer
*	function round
*	@param {string|number|BigArith} n number to round e.g "0.5"
*	@returns {BigArith} - n rounded to nearest whole number e.g "1"
*	Dependent on toString(), static compare(), isPositive(), add(), subtract()
*/
BigArith.round=function(n){
	var n = new BigArith(n);
	if(isNaN(n)) return NaN;
	n = n.toString();
	if(n.indexOf(".")>-1){
		n = n.split(".");
		if(BigArith.compare(n[1][0], "5") >= 0){
			if(new BigArith(n[0]).isPositive())
				n[0] = BigArith.add(n[0], "1").toString();
			else
				n[0] = BigArith.subtract(n[0], "1").toString();
		}
		n = n[0];
	}
	return new BigArith(n);
}

/**	
*	Format a number to a number of decimal places
*	function toFixed
*	@param {string|number|BigArith} d number of decimal place to return this.value in.
*	@returns {string} - this.value to a number of decimal places
*	Dependent on static toFixed()
*/
BigArith.prototype.toFixed=function(d=0){
	return BigArith.toFixed(this.value, d);
}

/**	
*	Round n to the nearest integer
*	function round
*	@param {string|number|BigArith} n number to format
*	@param {string|number|BigArith} d number of decimal place to return n in.
*	@returns {string} - n rounded to nearest whole number e.g "1"
*	Dependent on toString(), static compare(), isInteger(), add(), subtract()
*/
BigArith.toFixed=function(n, d=0){
	var e = new BigArith(d).floor().toString();
	if(isNaN(n) || isNaN(e)) return NaN;
	//if(BigArith.compare(e, 0) == -1 || BigArith.compare(e, new BigArith.decimalSupport) == 1 || isNaN(e)) throw new Error("Argument must be between 0 and "+ new BigArith.decimalSupport +"! " + e + " supplied.");
	var n = new BigArith(n);
	var sign = n.isNegative();
	if(!n.isInteger()){
		n = n.toString().split(".");
		if(BigArith.compare(e, "0") == 0){
			if(BigArith.compare(n[1][0], "5") >= 0){
				if(!sign){
					n[0] = BigArith.add(n[0], "1").toString();
				}
				else{
					n[0] = BigArith.subtract(n[0], "1").toString();
				}
				n[1] = "0";
			}
			else n[1] = "0";
		}
		else if(BigArith.compare(n[1].length.toString(), e) == -1){ n[1] += "0".repeat(e - Number(n[1].length));}
		else if(BigArith.compare(n[1].length.toString(), e) == 1){
			if(BigArith.compare(n[1][e], "5") >= 0){
				var z0 = n[1].slice(0, e).length;
				var z1 = BigArith.add(n[1].slice(0, e), "0").toString().length; //To check if it have leading zeros hence 0.00456 can become 0.456
				n[1] = BigArith.add(n[1].slice(0, e), "1").toString();
				var z2 = n[1].length;
				
				if(z0 != z1){//Has leading zero
					n[1] = "0".repeat(z0-z1) + n[1];
				}
				
				if(z2 > z1){
					if(n[1][0] != "0"){
						n[0] = BigArith.add(n[0], "1").toString();
						n[1] = "0".repeat(e);
					}
					else{
						n[1] = n[1].substr(1);
					}
				}
			}
			else n[1] = n[1].slice(0, e);
		}
		n = n[0]+((n[1]!="0")?("."+n[1]):"");
	}
	else n=n.toString()+((BigArith.compare(e, "0") == 1)?("."+"0".repeat(e)):"");
	return n; 
}

/**	
*	Random number between 0 and 1 (1 exclusive)
*	function random
*	@returns {BigArith} - any number between 0 and 1 (1 exclusive)
*	Dependent on Math.random(), floor(), toString(), valueOf()
*/
BigArith.random=function(){
	var len = new BigArith(Math.random()*new BigArith().decimalSupport).floor().valueOf();
	var n = "0";
	for(var i = 0; i < len; i++){
		n += new BigArith(Math.random()*10).floor().toString();
	}
	return (n == "0")?new BigArith(n):(new BigArith("0."+n.slice(1)));
}

/**	
*	Random integer between min and max (min inclusive, max exclusive) 
*	function randomInt
*	@param {number|string|BigArith} min minimum integer that can be returned (inclusive)
*	@param {number|string|BigArith} max maximum integer that can be returned (exclusive)
*	@returns {BigArith} - any integer between min and max
*	Dependent on static random(), floor(), toString(), multiply(), subtract(), add(), ceil()
*/
BigArith.randomInt=function(min, max){
	var min = new BigArith(min).floor();
	var max = new BigArith (max).ceil();
	if(isNaN(min) || isNaN(max)) return NaN;
	return (BigArith.random().multiply(BigArith.subtract(max, min)).add(min)).floor(); // floor((ran()*(max-min))+min)
}

/**	
*	Word representation of this.value
*	@return {string} - this.value in English short scale naming system words e.g "one billion" for "1000000000". 
*	Throw error if value of this.value is higher than 1x10^124 - (0.0{199}1)
*	Dependent on w_Dict2()
*/
BigArith.prototype.toWords = function(){
	var n = this.value, sign = false;

	if(this.value[0] == "-"){
		n = this.value.substr(1);
		sign = true;
	}
	else n=this.value;
	
	n = n.split(".");
	
	if(typeof n[0] == 'undefined') n[0] = "0";
	if(typeof n[1] == 'undefined') n[1] = "0";
	n[0] = n[0].replace(/^[0]*/g,""); if(n[0] == '') n[0] = "0";
	n[1] = n[1].replace(/[0]*$/g,"");
	
	if(n[0].length > this.wordSupport+3) throw new RangeError("Value higher than the recently supported range");
	if(n[1].length > this.decimalSupport) throw new RangeError("Length of mantissa value greater than supported length");
	
	//Characteristic part
	
	//Break into chunks of 3 digits e.g. ["1","000"] for "1000"
	var chunk = [], c = n[0];
	for(var i = c.length; i > -1; i-=3){
		chunk.unshift(c.slice((i-3>0)?i-3:0, i));
	}(chunk[0] == "")?chunk.shift():0;
	
	var word = "";
	for(var i = 0; i < chunk.length; i++){
		var m = chunk[i];
		if(m =="000") continue;
		if(m.length == 3){
			if(m[0] != "0"){
				word += this.w_Dict2(m[0]) + " hundred ";
				if(m[1] + m[2] != "00") word += "and "
			}
			if(m[1] == "1") word += " "+this.w_Dict2(m[1]+m[2]);
			else if(m[1] > "1") word += " "+this.w_Dict2(m[1]+"0");
			if(m[2] != "0" && m[1] != "1") word += " "+this.w_Dict2(m[2]);
		}
		if(m.length == 2){
			if(m[0] == "1")
			{
				word += " "+this.w_Dict2(m[0]+m[1]);
			}
			else{
				if(m[0] != "0")
					word += " "+this.w_Dict2(m[0]+"0");
				if(m[1] != "0")
					word += " "+this.w_Dict2(m[1]);
			}
		}
		if(m.length == 1){
			if(m[0] != "0")
				word += " "+this.w_Dict2(m[0]);
			else
				word = this.w_Dict2(m[0]);
		}
		word += " "+this.w_Dict2("0".repeat(3*(chunk.length-i-1))) + " ";
	}
	
	//Mantissa part
	if(n[1] != "") word += " point";
	for(var i = 0; i < n[1].length; i++){
		word += " "+this.w_Dict2(n[1][i]);
	}
	return (sign?"negative ":"") + word.replace(/\s+/g," ").trim();
}

/**	
*	Add n to this.value
*	function add
*	@param {number|string|BigArith} The summand with this.value as the second summand
*	@returns {BigArith} - sum of this.value and @param
*	Dependent of the static add()
*/
BigArith.prototype.add = function(n){
	return BigArith.add(this.value, n);
}

/**	
*	Add two numbers together
*	function add
*	@param {number|string|BigArith} A summand.
*	@param {number|string|BigArith} A summand.
*	@returns {BigArith} - sum of a and b
*	Dependent on toString(), floor(), substract(), abs(), max(), valueOf()
*/
BigArith.add = function(a, b){
	var a = new BigArith(a);
	var b = new BigArith(b);
	var signFlag = "";
	
	if(isNaN(a) || isNaN(b))
		return NaN;
	
	if(a.isNegative() && b.isPositive())
		return BigArith.subtract(b, a.abs());
	if(a.isPositive() && b.isNegative())
		return BigArith.subtract(a, b.abs());
	if(a.isNegative() && b.isNegative()){
		signFlag = "-";
		a = a.abs();
		b = b.abs();
	}
	
	a = a.toString().split(".");
	b = b.toString().split(".");
	(typeof(a[1]) == 'undefined')?a[1]="0":0;
	(typeof(b[1]) == 'undefined')?b[1]="0":0;
	
	var max = BigArith.max(a[1].length, b[1].length).valueOf();
	a[1] += "0".repeat(max - a[1].length);
	b[1] += "0".repeat(max - b[1].length);
	
	a = a[0] + a[1];
	b = b[0] + b[1];
	var result = "";
	var flag = 0;
	for(var i = a.length-1, j = b.length-1; i >= 0 || j >= 0; i--, j--)
	{
		var z = a.charAt(i)*1 + b.charAt(j)*1 + flag;
		if(z>9 && (i>0 || j>0))
		{
			flag = new BigArith(z/10).floor().valueOf();
			result = (z-flag*10)+result;
		}
		else
		{
			result = z+result;
			flag = 0;
		}
	}
	
	result = result.slice(0, result.length - max) + "." + result.slice(result.length - max);
	result = result.replace(/^0+/g,"")/*Remove front zeros*/.replace(/\.0+$/g,"")/*Remove zeros after decimal point zeros*/;
	if(result[0] == ".") result = "0" + result;
	return ((result == "")? new BigArith("0") : new BigArith(((signFlag=="")?"":"-")+result));
}

/**	
*	Subtract n from this.value
*	function subtract
*	@param {number|string|BigArith} The subtrahend with this.value as the minuend
*	@returns {BigArith} - difference of this.value and @param
*	Dependent on static subtract
*/
BigArith.prototype.subtract=function(n){
	return BigArith.subtract(this.value, n);
}

/**	
*	Subtract b from a
*	function subtract
*	@param {number|string|BigArith} The Minuend
*	@param {number|string|BigArith} The subtrahend 
*	@returns {BigArith} - difference of a and b
*	Dependent on add(), abs(), toString(), compare(), max(), valueOf()
*/
BigArith.subtract=function(a, b){
	var a = new BigArith(a);
	var b = new BigArith(b);
	if(isNaN(a) || isNaN(b))
		return NaN;
	
	if(a.isNegative() && b.isPositive())
		return BigArith.add(a, "-"+b.toString());
	if(a.isPositive() && b.isNegative())
		return BigArith.add(a, b.abs());
	if(a.isNegative() && b.isNegative()){
		//swap the absolute parameters
		var temp = a.abs();
		a = b.abs();
		b = temp;
	}
	
	a = a.toString().split(".");
	b = b.toString().split(".");
	(typeof(a[1]) == 'undefined')?a[1]="0":0;
	(typeof(b[1]) == 'undefined')?b[1]="0":0;
	
	var max = BigArith.max(a[1].length, b[1].length).valueOf();
	a[1] += "0".repeat(max - a[1].length);
	b[1] += "0".repeat(max - b[1].length);
	
	var signFlag = "";
	if(BigArith.compare(a[0]+"."+a[1], b[0]+"."+b[1]) >= 0){
		a = a[0]+a[1];
		b = b[0]+b[1];
	}
	else{
		//swap the parameters
		var temp = a[0]+a[1];
		a = b[0]+b[1];
		b = temp;
		signFlag = "-";
	}
	
	a = a.split("");
	b = b.split("");
	var result = "";
	for(var i = a.length-1, j = b.length-1; i >= 0 || j >= 0; i--, j--){
		if(isNaN(parseInt(b[j]))) b[j] = "0";
		if(parseInt(a[i]) >= parseInt(b[j])){
			result = (parseInt(a[i]) - parseInt(b[j])).toString() + result;
		}
		else if(parseInt(a[i]) < parseInt(b[j])){
			if(i == 0)
				result = (parseInt(a[i]) - parseInt(b[j])).toString() + result;
			else{
				result = (parseInt(a[i])+10 - parseInt(b[j])).toString() + result;
				a[i-1] = parseInt(a[i-1])-1;
			}
		}
	}
	result = result.slice(0, result.length - max) + "." + result.slice(result.length - max);
	result = result.replace(/^0+/g,"")/*Remove front zeros*/.replace(/\.0+$/g,"")/*Remove zeros after decimal point zeros*/;
	if(result[0] == ".") result = "0" + result;
	return ((result == "")? new BigArith("0") : new BigArith((signFlag+result)));
}

/**	
*	Multiplies n and this.value
*	function multiply
*	@param {number|string|BigArith} - the multiplier with this.value as the multiplicand
*	@returns {BigArith} - product of this.value and @param
*	Dependent on static multiply
*/
BigArith.prototype.multiply=function(n){
	return BigArith.multiply(this.value, n);
}

/**	
*	Multiplies a and b
*	function multiply
*	@param {number|string|BigArith} - the multiplicand
*	@param {number|string|BigArith} - the multiplier
*	@returns {BigArith} - product of a and b
*	Dependent on toString(), abs(), max(), static add(), valueOf()
*/
BigArith.multiply=function(a, b){
	var a = new BigArith(a);
	var b = new BigArith(b);
	var signFlag = "";
	
	if(isNaN(a) || isNaN(b)) return NaN;
	
	if((a.isNegative() || b.isNegative()) && !(a.isNegative() && b.isNegative())) signFlag = "-";
	
	a = a.abs().toString().split(".");
	b = b.abs().toString().split(".");
	(typeof(a[1]) == 'undefined')?a[1]="0":0;
	(typeof(b[1]) == 'undefined')?b[1]="0":0;
		
	var max = BigArith.max(a[1].length, b[1].length).valueOf();
	a[1] += "0".repeat(max - a[1].length);
	b[1] += "0".repeat(max - b[1].length);
	
	a = a[0] + a[1];
	b = b[0] + b[1];
	var results = [];
	for(var i = a.length-1; i >= 0; i--){
		var subSum = "";
		var flag = 0;
		if(i < a.lastIndexOf(a.charAt(i))){ /* Do not need to compute already computed values, just copy answer from previous computation*/
			results.push(results[a.length-1-a.lastIndexOf(a.charAt(i))]);
			continue;
		}
		else{
			for(var j = b.length-1; j >= 0; j--){
				var z = a.charAt(i)*b.charAt(j)+flag;
				if(z>9 && j>0){
					flag = new BigArith(z/10).floor().valueOf();
					subSum = (z-flag*10)+subSum;
				}
				else{
					subSum = z+subSum;
					flag = 0;
				}
			}
		}
		results.push(subSum);
	}
	
	// Sum all the answers
	var result = "0";
	for(var i = 0; i < results.length; i++) result = BigArith.add(result, results[i]+"0".repeat(i));
	
	//Put the decimal point in the apropriate place
	result = result.toString(); //It's a BigArith
	if(max*2 > result.length) result = "0".repeat(max*2 - result.length) + result; //Problem with slice if result is shorter than max*2
	result = result.slice(0, result.length - max*2) + "." + result.slice(result.length - max*2);
	
	return ((BigArith.compare(new BigArith(result),0) == 0)?new BigArith("0"):new BigArith(signFlag+result));
}

/**	
*	Return this.value%n (reminder of this.value/n)
*	function modulus
*	@param {string|number|BigArth} n The divisor with this.value as the dividend
*	@returns {BigArith} reminder of this.value/n
*	Dependent on static modulus
*/
BigArith.prototype.modulus=function(n){
	return BigArith.modulus(this.value, n);
}

/**	
*	Return a%b (reminder of a/b)
*	function modulus
*	@param {string|number|BigArth} a the dividend
*	@param {string|number|BigArth} b the divisor.
*	@returns {BigArith} - reminder of a/b
*	Dependent on static compare, isInteger, isNegative, divWithRem, abs, static multiply, static subtract, static divide, toString
*/
BigArith.modulus=function(a, b){
	var a = new BigArith(a);
	var b = new BigArith(b);
	if(BigArith.compare(b, "0") == 0 || isNaN(a) || isNaN(b)) return NaN;
	
	if(a.isInteger() && b.isInteger())
		return new BigArith(((a.isNegative())?"-":"")+BigArith.divWithRem(a, b)[1]);
	else
		return new BigArith(((a.isNegative())?"-":"")+BigArith.subtract(a.abs(), BigArith.multiply(BigArith.divide(a.abs(), b.abs()).toString().split(".")[0], b.abs())));
}

/**	
*	Return this.valus/n (division of this.valus and n)
*	function divide
*	@param {string|number|BigArth} The divisor with this.value as the dividend. 
*	@returns {BigArith} - The quotient to "decimalSupport" decimal places when necessary.
*/
BigArith.prototype.divide=function(n){
	return BigArith.divide(this.value, n);
}

/**	
*	Return a/b (division of a/b)
*	function divide
*	@param {string|number|BigArth} The dividend.
*	@param {string|number|BigArth} The divisor.
*	@returns {BigArith} - The quotient to "decimalSupport" decimal places when necessary.
*/
BigArith.divide=function(a, b){
	return BigArith.div(a, b, new BigArith().decimalSupport);
}

/**Helper**/
BigArith.div=function(a, b, d){
	var a = new BigArith(a).toString().split(".");
	var b = new BigArith(b).toString().split(".");
	
	//Note where the decimal points are and remove them
	var numeratorIndex = 0;
	var denominatorIndex = 0;
	if(typeof a[1] != "undefined")
		numeratorIndex = a[1].length;
	if(typeof b[1] != "undefined")
		denominatorIndex = b[1].length;
	a = a[0] + ((typeof a[1] != "undefined")?a[1]:"");
	b = b[0] + ((typeof b[1] != "undefined")?b[1]:"");

	var result = BigArith.divWithRem(a, b);
	var rem = result[1];
	var remResult = "0.";
	
	/*	If the decimal place index of denominator - numerator is positive, 
		we are likely going to encroach into the 200 decimal result 
		when shifting the decimal pointto the left. The best is to start count from -(denominator-numerator)
		instead of 0 in this case.
	*/

	var count = (denominatorIndex-numeratorIndex>0)?(-1*(denominatorIndex-numeratorIndex)):0, c = 0;
	var flag = false;
	while(BigArith.compare(rem, "0") == 1 && BigArith.compare(count, d+1) == -1){
		rem += "0";
		var j = BigArith.divWithRem(rem, b);
		remResult +=  j[0];
		rem = j[1];
		/*Don't count yet if quotient is still all 0's
		This takes care of (x/x.y) returning (x.x) instead of (x.y) 
		where x is any single digit, and y is any 200 digits*/
		if(j[0] > 0) flag = true; if(!flag) c++;
		if(c > 201) break; //if we have gotten 0.00{199 more 0's}, no need to continue
		if(flag)count++;
	}
	if(remResult == "0.") remResult = "0.0";
	result = result[0] + "." + remResult.split(".")[1];
	var dPosition = (result.indexOf(".") == -1)?result.length : result.indexOf("."); // decimal position in answer
	
	//Numerator decimal point means we shift the decimal point in answer forward
	//Denominator decimal point means we shift the decimal point in answer backward
	dPosition = dPosition+denominatorIndex-numeratorIndex;
	result = result.split(".");
	if(dPosition < 0){
		result = "0." + "0".repeat(-1*dPosition) + result[0] + result[1];
	}
	else if(dPosition == 0){
		result = "0." + result[0] + result[1];
	}
	else if(dPosition > 0){
		if(dPosition <= result[0].length){
			result = result[0].slice(0, dPosition) + "." + result[0].slice(dPosition) + result[1];
		}
		else{
			dPosition -= result[0].length; 
			result = result[0] + result[1].slice(0, dPosition) +
				((dPosition-result[1].length>0)?"0".repeat(dPosition-result[1].length):"") + "." +
				result[1].substr(dPosition)+ "0";
		}
	}
	return new BigArith(new BigArith(result.replace(/^0+/,"")).toFixed(d));
};

/**	
*	Return a/b (division of a/b)
*	function divWithRem
*	@param {string|number|BigArth} a The dividend. Must always be integers.
*	@param {String|Number|BigArth} b The divisor. Must always be integers.
*	@returns {Array of "strings of digits" (integer)} - [quotient, reminder]
*/
BigArith.divWithRem=function(a, b){
	var a = new BigArith(a);
	var b = new BigArith(b);
	if(isNaN(a) || isNaN(b))
		return NaN;
	
	if(!a.isInteger() || !b.isInteger()) throw new TypeError("divWithRem accepts only integers. Non integers passed in");
	if(BigArith.compare(b, 0) == 0) throw new RangeError("Division by zero");
	var signFlag = false;
	
	if((a.isNegative() || b.isNegative()) && !(a.isNegative() && b.isNegative())) signFlag = true; //Only one of the parameters is negative
	
	a = a.abs().toString();
	b = b.abs().toString();
	
	var aLen = a.length;
	var aSub = "";
	var result = "0";
	var hold = a;
	for(var i = 0; i < aLen; i++){
		aSub += a[i];
		if(BigArith.compare(aSub, "0") == 0){result += "0";}
		else if(BigArith.compare(b, aSub) == 1){result += "0"; continue;} 
		else{
			var count = 0;
			hold = aSub;
			while(BigArith.compare(hold, b) != -1){
				hold = BigArith.subtract(hold, b);
				count++;
			}
			result += count;
		}
		aSub = hold.toString();
	}
	if(aSub.length > 1 && aSub[0] == "0"){
		hold = new BigArith(aSub).toString();
	}
	result = result.replace(/^0*/g,"");
	result = (result == "")? "0" : result;
	return [((signFlag)?"-":"")+result, hold.toString()];
};

/*	[UNSTABLE - Takes a lot of computation time]
*	Returns the sine of an angle (in degree)
*	function sin
*	@param {string|number|BigArth} n The angle in degree
*	@returns {BigArith} - sine of n
*	x - x^3/3! + x^5/5! - x^7/7! + x^9/9! - ... (x in radian)
*/
BigArith.sin=function(n){
	//Have to use PI to atleast 203 decimal places so new BigArith("PI") won't work here as it is to 200 decimal place
	var x = BigArith.div(new BigArith("3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975"), 180, new BigArith().decimalSupport+3).multiply(n);
	
	var tolerance = new BigArith("0." + "0".repeat(new BigArith().decimalSupport+3) + "1");
	var sin = new BigArith("0");
	var i = 1;
	var term = x.toString(), _x = x.toString();
	var sign = true;
	while(BigArith.compare(term, tolerance) == 1){
		if(i > 1){
			_x = BigArith.multiply(_x, x.square()).toString().split(".");
			//the first 203 decimal digit is needed as _x gets very large quickly
			_x = _x[0] + "." +_x[1].substr(0, new BigArith().decimalSupport+3); 
			
			term = BigArith.div(_x, BigArith.factorial(i), new BigArith().decimalSupport+3).toString();
		}
		if(sign)
			sin = BigArith.add(sin, term);
		else
			sin = BigArith.subtract(sin, term);
		sign = !sign;
		i += 2;
	}
	return new BigArith(sin.toFixed(new BigArith().decimalSupport));
}

/*	[UNSTABLE - Takes a lot of computation time]
*	Returns the cosine of an angle (when angle is in degrees)
*	function cos
*	@param {string|number|BigArth} n The angle in degrees
*	@returns {BigArith} - cosine of n
*	1 - x^2/2! + x^4/4! - x^6/6! + x8/8! - ... (x in radian)
*/
BigArith.cos=function(n){
	//Have to use PI to atleast 203 decimal places so new BigArith("PI") won't work here as it is to 200 decimal place
	var x = BigArith.div(new BigArith("3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975"), 180, new BigArith().decimalSupport+3).multiply(n);
	
	var tolerance = new BigArith("0." + "0".repeat(new BigArith().decimalSupport+3) + "1");
	var cos = new BigArith("0");
	var i = 0;
	var term = "1", _x = "1";
	var sign = true;
	while(term == "1" || BigArith.compare(term, tolerance) == 1){
		if(i > 1){
			_x = BigArith.multiply(_x, x.square());
			if(BigArith.compare(_x, "0") == 0) break;
			_x = _x.toString().split(".");
			//the first 203 decimal digit is needed as _x gets very large quickly
			_x = _x[0] + "." +_x[1].substr(0, new BigArith().decimalSupport+3);
			term = BigArith.div(_x, BigArith.factorial(i), new BigArith().decimalSupport+3).toString();
		}
		if(sign)
			cos = BigArith.add(cos, term);
		else
			cos = BigArith.subtract(cos, term);
		sign = !sign;
		i += 2;
	}
	return new BigArith(cos.toFixed(new BigArith().decimalSupport));
}

/*	[UNSTABLE - Takes a lot of computation time]
*	Returns the tangent of an angle (when angle is in degrees)
*	function cos
*	@param {string|number|BigArth} n The angle in degrees
*	@returns {BigArith} - tangent of n
*	tan = sin/cos
*/
BigArith.tan=function(n){
	return BigArith.divide(BigArith.sin(n), BigArith.cos(n));
}

/**	
*	Word Dictionary
*	function w_Dict
*	@param {string} - Word value for numbers e.g "one"
*	@returns {string} - String value of @param e.g "1"
*/
BigArith.prototype.w_Dict=function(w){
	/*Word Dictionary*/
	var w_Dict = [];
	w_Dict["zero"] = "0"; w_Dict["one"] = "1"; w_Dict["two"] = "2"; w_Dict["three"] = "3"; w_Dict["four"] = "4"; w_Dict["five"] = "5"; w_Dict["six"] = "6"; w_Dict["seven"] = "7"; w_Dict["eight"] = "8"; w_Dict["nine"] = "9"; w_Dict["ten"] = "10"; 
	w_Dict["eleven"] = "11"; w_Dict["twelve"] = "12"; w_Dict["thirteen"] = "13"; w_Dict["fourteen"] = "14"; w_Dict["fifteen"] = "15"; w_Dict["sixteen"] = "16"; w_Dict["seventeen"] = "17"; w_Dict["eighteen"] = "18"; w_Dict["nineteen"] = "19"; w_Dict["twenty"] = "20"; 
	w_Dict["thirty"] = "30"; w_Dict["forty"] = "40"; w_Dict["fifty"] = "50"; w_Dict["sixty"] = "60"; w_Dict["seventy"] = "70"; w_Dict["eighty"] = "80"; w_Dict["ninety"] = "90"; w_Dict["hundred"] = "0".repeat(2); 
	w_Dict["thousand"] = "0".repeat(3); w_Dict["million"]="0".repeat(6);w_Dict["billion"]="0".repeat(9);w_Dict["trillion"]="0".repeat(12);w_Dict["quadrillion"]="0".repeat(15);w_Dict["quintillion"]="0".repeat(18);w_Dict["sextillion"]="0".repeat(21);w_Dict["septillion"]="0".repeat(24);w_Dict["octillion"]="0".repeat(27);w_Dict["nonillion"]="0".repeat(30);w_Dict["decillion"]="0".repeat(33);w_Dict["undecillion"]="0".repeat(36);w_Dict["duodecillion"]="0".repeat(39);w_Dict["tredecillion"]="0".repeat(42);w_Dict["quattuordecillion"]="0".repeat(45);w_Dict["quindecillion"]="0".repeat(48);w_Dict["sexdecillion"]="0".repeat(51);w_Dict["septendecillion"]="0".repeat(54);w_Dict["octodecillion"]="0".repeat(57);w_Dict["novemdecillion"]="0".repeat(60);w_Dict["vigintillion"]="0".repeat(63);w_Dict["unvigintillion"]="0".repeat(66);w_Dict["duovigintillion"]="0".repeat(69);w_Dict["trevigintillion"]="0".repeat(72);w_Dict["quattuorvigintillion"]="0".repeat(75);w_Dict["quinvigintillion"]="0".repeat(78);w_Dict["sexvigintillion"]="0".repeat(81);w_Dict["septenvigintillion"]="0".repeat(84);w_Dict["octavigintillion"]="0".repeat(87);w_Dict["novemvigintillion"]="0".repeat(90);w_Dict["trigintillion"]="0".repeat(93);w_Dict["untrigintillion"]="0".repeat(96);w_Dict["duotrigintillion"]="0".repeat(99);w_Dict["tretrigintillion"]="0".repeat(102);w_Dict["quattuortrigintillion"]="0".repeat(105);w_Dict["quintrigintillion"]="0".repeat(108);w_Dict["sextrigintillion"]="0".repeat(111);w_Dict["septentrigintillion"]="0".repeat(114);w_Dict["octotrigintillion"]="0".repeat(117);w_Dict["novemtrigintillion"]="0".repeat(120);w_Dict["quadragintillion"]="0".repeat(123);w_Dict["unquadragintillion"]="0".repeat(126);w_Dict["duoquadragintillion"]="0".repeat(129);w_Dict["trequadragintillion"]="0".repeat(132);w_Dict["quattuorquadragintillion"]="0".repeat(135);w_Dict["quinquadragintillion"]="0".repeat(138);w_Dict["sexquadragintillion"]="0".repeat(141);w_Dict["septenquadragintillion"]="0".repeat(144);w_Dict["octaquadragintillion"]="0".repeat(147);w_Dict["novemquadragintillion"]="0".repeat(150);w_Dict["quinquagintillion"]="0".repeat(153);w_Dict["unquinquagintillion"]="0".repeat(156);w_Dict["duoquinquagintillion"]="0".repeat(159);w_Dict["trequinquagintillion"]="0".repeat(162);w_Dict["quattuorquinquagintillion"]="0".repeat(165);w_Dict["quinquinquagintillion"]="0".repeat(168);w_Dict["sexquinquagintillion"]="0".repeat(171);w_Dict["septenquinquagintillion"]="0".repeat(174);w_Dict["octaquinquagintillion"]="0".repeat(177);w_Dict["novemquinquagintillion"]="0".repeat(180);w_Dict["sexagintillion"]="0".repeat(183);w_Dict["unsexagintillion"]="0".repeat(186);w_Dict["duosexagintillion"]="0".repeat(189);w_Dict["tresexagintillion"]="0".repeat(192);w_Dict["quattuorsexagintillion"]="0".repeat(195);w_Dict["quinsexagintillion"]="0".repeat(198);w_Dict["sexsexagintillion"]="0".repeat(201);w_Dict["septensexagintillion"]="0".repeat(204);w_Dict["octasexagintillion"]="0".repeat(207);w_Dict["novemsexagintillion"]="0".repeat(210);w_Dict["septuagintillion"]="0".repeat(213);w_Dict["unseptuagintillion"]="0".repeat(216);w_Dict["duoseptuagintillion"]="0".repeat(219);w_Dict["treseptuagintillion"]="0".repeat(222);w_Dict["quattuorseptuagintillion"]="0".repeat(225);w_Dict["quinseptuagintillion"]="0".repeat(228);w_Dict["sexseptuagintillion"]="0".repeat(231);w_Dict["septenseptuagintillion"]="0".repeat(234);w_Dict["octaseptuagintillion"]="0".repeat(237);w_Dict["novemseptuagintillion"]="0".repeat(240);w_Dict["octagintillion"]="0".repeat(243);w_Dict["unoctogintillion"]="0".repeat(246);w_Dict["duooctogintillion"]="0".repeat(249);w_Dict["treoctogintillion"]="0".repeat(252);w_Dict["quattuoroctogintillion"]="0".repeat(255);w_Dict["quinoctogintillion"]="0".repeat(258);w_Dict["sexoctogintillion"]="0".repeat(261);w_Dict["septenoctogintillion"]="0".repeat(264);w_Dict["octaoctogintillion"]="0".repeat(267);w_Dict["novemoctogintillion"]="0".repeat(270);w_Dict["nonagintillion"]="0".repeat(273);w_Dict["unnonagintillion"]="0".repeat(276);w_Dict["duononagintillion"]="0".repeat(279);w_Dict["trenonagintillion"]="0".repeat(282);w_Dict["quattuornonagintillion"]="0".repeat(285);w_Dict["quinnonagintillion"]="0".repeat(288);w_Dict["sexnonagintillion"]="0".repeat(291);w_Dict["septennonagintillion"]="0".repeat(294);w_Dict["octanonagintillion"]="0".repeat(297);w_Dict["novemnonagintillion"]="0".repeat(300);w_Dict["centillion"]="0".repeat(303);w_Dict["cenuntillion"]="0".repeat(306);w_Dict["cendotillion"]="0".repeat(309);w_Dict["centretillion"]="0".repeat(312);w_Dict["cenquattuortillion"]="0".repeat(315);w_Dict["cenquintillion"]="0".repeat(318);w_Dict["censextillion"]="0".repeat(321);w_Dict["censeptentillion"]="0".repeat(324);w_Dict["cenoctotillion"]="0".repeat(327);w_Dict["cennovemtillion"]="0".repeat(330);w_Dict["cendecillion"]="0".repeat(333);w_Dict["cenundecillion"]="0".repeat(336);w_Dict["cendodecillion"]="0".repeat(339);w_Dict["centredecillion"]="0".repeat(342);w_Dict["cenquattuordecillion"]="0".repeat(345);w_Dict["cenquindecillion"]="0".repeat(348);w_Dict["censexdecillion"]="0".repeat(351);w_Dict["censeptendecillion"]="0".repeat(354);w_Dict["cenoctodecillion"]="0".repeat(357);w_Dict["cennovemdecillion"]="0".repeat(360);w_Dict["cenvigintillion"]="0".repeat(363);w_Dict["cenunvigintillion"]="0".repeat(366);w_Dict["cendovigintillion"]="0".repeat(369);w_Dict["centrevigintillion"]="0".repeat(372);w_Dict["cenquattuorvigintillion"]="0".repeat(375);w_Dict["cenquinvigintillion"]="0".repeat(378);w_Dict["censexvigintillion"]="0".repeat(381);w_Dict["censeptenvigintillion"]="0".repeat(384);w_Dict["cenoctovigintillion"]="0".repeat(387);w_Dict["cennovemvigintillion"]="0".repeat(390);w_Dict["centrigintillion"]="0".repeat(393);w_Dict["cenuntrigintillion"]="0".repeat(396);w_Dict["cendotrigintillion"]="0".repeat(399);w_Dict["centretrigintillion"]="0".repeat(402);w_Dict["cenquattuortrigintillion"]="0".repeat(405);w_Dict["cenquintrigintillion"]="0".repeat(408);w_Dict["censextrigintillion"]="0".repeat(411);w_Dict["censeptentrigintillion"]="0".repeat(414);w_Dict["cenoctotrigintillion"]="0".repeat(417);w_Dict["cennovemtrigintillion"]="0".repeat(420);w_Dict["cenquadragintillion"]="0".repeat(423);w_Dict["cenunquadragintillion"]="0".repeat(426);w_Dict["cendoquadragintillion"]="0".repeat(429);w_Dict["centrequadragintillion"]="0".repeat(432);w_Dict["cenquattuorquadragintillion"]="0".repeat(435);w_Dict["cenquinquadragintillion"]="0".repeat(438);w_Dict["censexquadragintillion"]="0".repeat(441);w_Dict["censeptenquadragintillion"]="0".repeat(444);w_Dict["cenoctoquadragintillion"]="0".repeat(447);w_Dict["cennovemquadragintillion"]="0".repeat(450);w_Dict["cenquinquagintillion"]="0".repeat(453);w_Dict["cenunquinquagintillion"]="0".repeat(456);w_Dict["cendoquinquagintillion"]="0".repeat(459);w_Dict["centrequinquagintillion"]="0".repeat(462);w_Dict["cenquattuorquinquagintillion"]="0".repeat(465);w_Dict["cenquinquinquagintillion"]="0".repeat(468);w_Dict["censexquinquagintillion"]="0".repeat(471);w_Dict["censeptenquinquagintillion"]="0".repeat(474);w_Dict["cenoctoquinquagintillion"]="0".repeat(477);w_Dict["cennovemquinquagintillion"]="0".repeat(480);w_Dict["censexagintillion"]="0".repeat(483);w_Dict["cenunsexagintillion"]="0".repeat(486);w_Dict["cendosexagintillion"]="0".repeat(489);w_Dict["centresexagintillion"]="0".repeat(492);w_Dict["cenquattuorsexagintillion"]="0".repeat(495);w_Dict["cenquinsexagintillion"]="0".repeat(498);w_Dict["censexsexagintillion"]="0".repeat(501);w_Dict["censeptensexagintillion"]="0".repeat(504);w_Dict["cenoctosexagintillion"]="0".repeat(507);w_Dict["cennovemsexagintillion"]="0".repeat(510);w_Dict["censeptuagintillion"]="0".repeat(513);w_Dict["cenunseptuagintillion"]="0".repeat(516);w_Dict["cendoseptuagintillion"]="0".repeat(519);w_Dict["centreseptuagintillion"]="0".repeat(522);w_Dict["cenquattuorseptuagintillion"]="0".repeat(525);w_Dict["cenquinseptuagintillion"]="0".repeat(528);w_Dict["censexseptuagintillion"]="0".repeat(531);w_Dict["censeptenseptuagintillion"]="0".repeat(534);w_Dict["cenoctoseptuagintillion"]="0".repeat(537);w_Dict["cennovemseptuagintillion"]="0".repeat(540);w_Dict["cenoctogintillion"]="0".repeat(543);w_Dict["cenunoctogintillion"]="0".repeat(546);w_Dict["cendooctogintillion"]="0".repeat(549);w_Dict["centreoctogintillion"]="0".repeat(552);w_Dict["cenquattuoroctogintillion"]="0".repeat(555);w_Dict["cenquinoctogintillion"]="0".repeat(558);w_Dict["censexoctogintillion"]="0".repeat(561);w_Dict["censeptenoctogintillion"]="0".repeat(564);w_Dict["cenoctooctogintillion"]="0".repeat(567);w_Dict["cennovemoctogintillion"]="0".repeat(570);w_Dict["cennonagintillion"]="0".repeat(573);w_Dict["cenunnonagintillion"]="0".repeat(576);w_Dict["cendononagintillion"]="0".repeat(579);w_Dict["centrenonagintillion"]="0".repeat(582);w_Dict["cenquattuornonagintillion"]="0".repeat(585);w_Dict["cenquinnonagintillion"]="0".repeat(588);w_Dict["censexnonagintillion"]="0".repeat(591);w_Dict["censeptennonagintillion"]="0".repeat(594);w_Dict["cenoctononagintillion"]="0".repeat(597);w_Dict["cennovemnonagintillion"]="0".repeat(600);w_Dict["duocentillion"]="0".repeat(603);w_Dict["duocenuntillion"]="0".repeat(606);w_Dict["duocendotillion"]="0".repeat(609);w_Dict["duocentretillion"]="0".repeat(612);w_Dict["duocenquattuortillion"]="0".repeat(615);w_Dict["duocenquintillion"]="0".repeat(618);w_Dict["duocensextillion"]="0".repeat(621);w_Dict["duocenseptentillion"]="0".repeat(624);w_Dict["duocenoctotillion"]="0".repeat(627);w_Dict["duocennovemtillion"]="0".repeat(630);w_Dict["duocendecillion"]="0".repeat(633);w_Dict["duocenundecillion"]="0".repeat(636);w_Dict["duocendodecillion"]="0".repeat(639);w_Dict["duocentredecillion"]="0".repeat(642);w_Dict["duocenquattuordecillion"]="0".repeat(645);w_Dict["duocenquindecillion"]="0".repeat(648);w_Dict["duocensexdecillion"]="0".repeat(651);w_Dict["duocenseptendecillion"]="0".repeat(654);w_Dict["duocenoctodecillion"]="0".repeat(657);w_Dict["duocennovemdecillion"]="0".repeat(660);w_Dict["duocenvigintillion"]="0".repeat(663);w_Dict["duocenunvigintillion"]="0".repeat(666);w_Dict["duocendovigintillion"]="0".repeat(669);w_Dict["duocentrevigintillion"]="0".repeat(672);w_Dict["duocenquattuorvigintillion"]="0".repeat(675);w_Dict["duocenquinvigintillion"]="0".repeat(678);w_Dict["duocensexvigintillion"]="0".repeat(681);w_Dict["duocenseptenvigintillion"]="0".repeat(684);w_Dict["duocenoctovigintillion"]="0".repeat(687);w_Dict["duocennovemvigintillion"]="0".repeat(690);w_Dict["duocentrigintillion"]="0".repeat(693);w_Dict["duocenuntrigintillion"]="0".repeat(696);w_Dict["duocendotrigintillion"]="0".repeat(699);w_Dict["duocentretrigintillion"]="0".repeat(702);w_Dict["duocenquattuortrigintillion"]="0".repeat(705);w_Dict["duocenquintrigintillion"]="0".repeat(708);w_Dict["duocensextrigintillion"]="0".repeat(711);w_Dict["duocenseptentrigintillion"]="0".repeat(714);w_Dict["duocenoctotrigintillion"]="0".repeat(717);w_Dict["duocennovemtrigintillion"]="0".repeat(720);w_Dict["duocenquadragintillion"]="0".repeat(723);w_Dict["duocenunquadragintillion"]="0".repeat(726);w_Dict["duocendoquadragintillion"]="0".repeat(729);w_Dict["duocentrequadragintillion"]="0".repeat(732);w_Dict["duocenquattuorquadragintillion"]="0".repeat(735);w_Dict["duocenquinquadragintillion"]="0".repeat(738);w_Dict["duocensexquadragintillion"]="0".repeat(741);w_Dict["duocenseptenquadragintillion"]="0".repeat(744);w_Dict["duocenoctoquadragintillion"]="0".repeat(747);w_Dict["duocennovemquadragintillion"]="0".repeat(750);w_Dict["duocenquinquagintillion"]="0".repeat(753);w_Dict["duocenunquinquagintillion"]="0".repeat(756);w_Dict["duocendoquinquagintillion"]="0".repeat(759);w_Dict["duocentrequinquagintillion"]="0".repeat(762);w_Dict["duocenquattuorquinquagintillion"]="0".repeat(765);w_Dict["duocenquinquinquagintillion"]="0".repeat(768);w_Dict["duocensexquinquagintillion"]="0".repeat(771);w_Dict["duocenseptenquinquagintillion"]="0".repeat(774);w_Dict["duocenoctoquinquagintillion"]="0".repeat(777);w_Dict["duocennovemquinquagintillion"]="0".repeat(780);w_Dict["duocensexagintillion"]="0".repeat(783);w_Dict["duocenunsexagintillion"]="0".repeat(786);w_Dict["duocendosexagintillion"]="0".repeat(789);w_Dict["duocentresexagintillion"]="0".repeat(792);w_Dict["duocenquattuorsexagintillion"]="0".repeat(795);w_Dict["duocenquinsexagintillion"]="0".repeat(798);w_Dict["duocensexsexagintillion"]="0".repeat(801);w_Dict["duocenseptensexagintillion"]="0".repeat(804);w_Dict["duocenoctosexagintillion"]="0".repeat(807);w_Dict["duocennovemsexagintillion"]="0".repeat(810);w_Dict["duocenseptuagintillion"]="0".repeat(813);w_Dict["duocenunseptuagintillion"]="0".repeat(816);w_Dict["duocendoseptuagintillion"]="0".repeat(819);w_Dict["duocentreseptuagintillion"]="0".repeat(822);w_Dict["duocenquattuorseptuagintillion"]="0".repeat(825);w_Dict["duocenquinseptuagintillion"]="0".repeat(828);w_Dict["duocensexseptuagintillion"]="0".repeat(831);w_Dict["duocenseptenseptuagintillion"]="0".repeat(834);w_Dict["duocenoctoseptuagintillion"]="0".repeat(837);w_Dict["duocennovemseptuagintillion"]="0".repeat(840);w_Dict["duocenoctogintillion"]="0".repeat(843);w_Dict["duocenunoctogintillion"]="0".repeat(846);w_Dict["duocendooctogintillion"]="0".repeat(849);w_Dict["duocentreoctogintillion"]="0".repeat(852);w_Dict["duocenquattuoroctogintillion"]="0".repeat(855);w_Dict["duocenquinoctogintillion"]="0".repeat(858);w_Dict["duocensexoctogintillion"]="0".repeat(861);w_Dict["duocenseptenoctogintillion"]="0".repeat(864);w_Dict["duocenoctooctogintillion"]="0".repeat(867);w_Dict["duocennovemoctogintillion"]="0".repeat(870);w_Dict["duocennonagintillion"]="0".repeat(873);w_Dict["duocenunnonagintillion"]="0".repeat(876);w_Dict["duocendononagintillion"]="0".repeat(879);w_Dict["duocentrenonagintillion"]="0".repeat(882);w_Dict["duocenquattuornonagintillion"]="0".repeat(885);w_Dict["duocenquinnonagintillion"]="0".repeat(888);w_Dict["duocensexnonagintillion"]="0".repeat(891);w_Dict["duocenseptennonagintillion"]="0".repeat(894);w_Dict["duocenoctononagintillion"]="0".repeat(897);w_Dict["duocennovemnonagintillion"]="0".repeat(900);w_Dict["trecentillion"]="0".repeat(903);w_Dict["trecenuntillion"]="0".repeat(906);w_Dict["trecendotillion"]="0".repeat(909);w_Dict["trecentretillion"]="0".repeat(912);w_Dict["trecenquattuortillion"]="0".repeat(915);w_Dict["trecenquintillion"]="0".repeat(918);w_Dict["trecensextillion"]="0".repeat(921);w_Dict["trecenseptentillion"]="0".repeat(924);w_Dict["trecenoctotillion"]="0".repeat(927);w_Dict["trecennovemtillion"]="0".repeat(930);w_Dict["trecendecillion"]="0".repeat(933);w_Dict["trecenundecillion"]="0".repeat(936);w_Dict["trecendodecillion"]="0".repeat(939);w_Dict["trecentredecillion"]="0".repeat(942);w_Dict["trecenquattuordecillion"]="0".repeat(945);w_Dict["trecenquindecillion"]="0".repeat(948);w_Dict["trecensexdecillion"]="0".repeat(951);w_Dict["trecenseptendecillion"]="0".repeat(954);w_Dict["trecenoctodecillion"]="0".repeat(957);w_Dict["trecennovemdecillion"]="0".repeat(960);w_Dict["trecenvigintillion"]="0".repeat(963);w_Dict["trecenunvigintillion"]="0".repeat(966);w_Dict["trecendovigintillion"]="0".repeat(969);w_Dict["trecentrevigintillion"]="0".repeat(972);w_Dict["trecenquattuorvigintillion"]="0".repeat(975);w_Dict["trecenquinvigintillion"]="0".repeat(978);w_Dict["trecensexvigintillion"]="0".repeat(981);w_Dict["trecenseptenvigintillion"]="0".repeat(984);w_Dict["trecenoctovigintillion"]="0".repeat(987);w_Dict["trecennovemvigintillion"]="0".repeat(990);w_Dict["trecentrigintillion"]="0".repeat(993);w_Dict["trecenuntrigintillion"]="0".repeat(996);w_Dict["trecendotrigintillion"]="0".repeat(999);w_Dict["trecentretrigintillion"]="0".repeat(1002);
	return w_Dict[w];
};

/**	
*	Word Dictionary 2
*	function w_Dict2
*	@param {string} - Number as strings of digits e.g "1"
*	@returns {String} - @param value in English short scale naming system words e.g "one billion" for "1000000000"
*/
BigArith.prototype.w_Dict2=function(w){
	/*Word Dictionary*/
	var w_Dict = []; w_Dict[""] = "";
	w_Dict["0"] = "zero"; w_Dict["1"] = "one"; w_Dict["2"] = "two"; w_Dict["3"] = "three"; w_Dict["4"] = "four"; w_Dict["5"] = "five"; w_Dict["6"] = "six"; w_Dict["7"] = "seven"; w_Dict["8"] = "eight"; w_Dict["9"] = "nine"; w_Dict["10"] = "ten"; 
	w_Dict["11"] = "eleven"; w_Dict["12"] = "twelve"; w_Dict["13"] = "thirteen"; w_Dict["14"] = "fourteen"; w_Dict["15"] = "fifteen"; w_Dict["16"] = "sixteen"; w_Dict["17"] = "seventeen"; w_Dict["18"] = "eighteen"; w_Dict["19"] = "nineteen"; w_Dict["20"] = "twenty"; 
	w_Dict["30"] = "thirty"; w_Dict["40"] = "forty"; w_Dict["50"] = "fifty"; w_Dict["60"] = "sixty"; w_Dict["70"] = "seventy"; w_Dict["80"] = "eighty"; w_Dict["90"] = "ninety"; w_Dict["0".repeat(2)] = "hundred"; 
	w_Dict["0".repeat(3)] = "thousand"; w_Dict["0".repeat(6)]="million";w_Dict["0".repeat(9)]="billion";w_Dict["0".repeat(12)]="trillion";w_Dict["0".repeat(15)]="quadrillion";w_Dict["0".repeat(18)]="quintillion";w_Dict["0".repeat(21)]="sextillion";w_Dict["0".repeat(24)]="septillion";w_Dict["0".repeat(27)]="octillion";w_Dict["0".repeat(30)]="nonillion";w_Dict["0".repeat(33)]="decillion";w_Dict["0".repeat(36)]="undecillion";w_Dict["0".repeat(39)]="duodecillion";w_Dict["0".repeat(42)]="tredecillion";w_Dict["0".repeat(45)]="quattuordecillion";w_Dict["0".repeat(48)]="quindecillion";w_Dict["0".repeat(51)]="sexdecillion";w_Dict["0".repeat(54)]="septendecillion";w_Dict["0".repeat(57)]="octodecillion";w_Dict["0".repeat(60)]="novemdecillion";w_Dict["0".repeat(63)]="vigintillion";w_Dict["0".repeat(66)]="unvigintillion";w_Dict["0".repeat(69)]="duovigintillion";w_Dict["0".repeat(72)]="trevigintillion";w_Dict["0".repeat(75)]="quattuorvigintillion";w_Dict["0".repeat(78)]="quinvigintillion";w_Dict["0".repeat(81)]="sexvigintillion";w_Dict["0".repeat(84)]="septenvigintillion";w_Dict["0".repeat(87)]="octavigintillion";w_Dict["0".repeat(90)]="novemvigintillion";w_Dict["0".repeat(93)]="trigintillion";w_Dict["0".repeat(96)]="untrigintillion";w_Dict["0".repeat(99)]="duotrigintillion";w_Dict["0".repeat(102)]="tretrigintillion";w_Dict["0".repeat(105)]="quattuortrigintillion";w_Dict["0".repeat(108)]="quintrigintillion";w_Dict["0".repeat(111)]="sextrigintillion";w_Dict["0".repeat(114)]="septentrigintillion";w_Dict["0".repeat(117)]="octotrigintillion";w_Dict["0".repeat(120)]="novemtrigintillion";w_Dict["0".repeat(123)]="quadragintillion";w_Dict["0".repeat(126)]="unquadragintillion";w_Dict["0".repeat(129)]="duoquadragintillion";w_Dict["0".repeat(132)]="trequadragintillion";w_Dict["0".repeat(135)]="quattuorquadragintillion";w_Dict["0".repeat(138)]="quinquadragintillion";w_Dict["0".repeat(141)]="sexquadragintillion";w_Dict["0".repeat(144)]="septenquadragintillion";w_Dict["0".repeat(147)]="octaquadragintillion";w_Dict["0".repeat(150)]="novemquadragintillion";w_Dict["0".repeat(153)]="quinquagintillion";w_Dict["0".repeat(156)]="unquinquagintillion";w_Dict["0".repeat(159)]="duoquinquagintillion";w_Dict["0".repeat(162)]="trequinquagintillion";w_Dict["0".repeat(165)]="quattuorquinquagintillion";w_Dict["0".repeat(168)]="quinquinquagintillion";w_Dict["0".repeat(171)]="sexquinquagintillion";w_Dict["0".repeat(174)]="septenquinquagintillion";w_Dict["0".repeat(177)]="octaquinquagintillion";w_Dict["0".repeat(180)]="novemquinquagintillion";w_Dict["0".repeat(183)]="sexagintillion";w_Dict["0".repeat(186)]="unsexagintillion";w_Dict["0".repeat(189)]="duosexagintillion";w_Dict["0".repeat(192)]="tresexagintillion";w_Dict["0".repeat(195)]="quattuorsexagintillion";w_Dict["0".repeat(198)]="quinsexagintillion";w_Dict["0".repeat(201)]="sexsexagintillion";w_Dict["0".repeat(204)]="septensexagintillion";w_Dict["0".repeat(207)]="octasexagintillion";w_Dict["0".repeat(210)]="novemsexagintillion";w_Dict["0".repeat(213)]="septuagintillion";w_Dict["0".repeat(216)]="unseptuagintillion";w_Dict["0".repeat(219)]="duoseptuagintillion";w_Dict["0".repeat(222)]="treseptuagintillion";w_Dict["0".repeat(225)]="quattuorseptuagintillion";w_Dict["0".repeat(228)]="quinseptuagintillion";w_Dict["0".repeat(231)]="sexseptuagintillion";w_Dict["0".repeat(234)]="septenseptuagintillion";w_Dict["0".repeat(237)]="octaseptuagintillion";w_Dict["0".repeat(240)]="novemseptuagintillion";w_Dict["0".repeat(243)]="octagintillion";w_Dict["0".repeat(246)]="unoctogintillion";w_Dict["0".repeat(249)]="duooctogintillion";w_Dict["0".repeat(252)]="treoctogintillion";w_Dict["0".repeat(255)]="quattuoroctogintillion";w_Dict["0".repeat(258)]="quinoctogintillion";w_Dict["0".repeat(261)]="sexoctogintillion";w_Dict["0".repeat(264)]="septenoctogintillion";w_Dict["0".repeat(267)]="octaoctogintillion";w_Dict["0".repeat(270)]="novemoctogintillion";w_Dict["0".repeat(273)]="nonagintillion";w_Dict["0".repeat(276)]="unnonagintillion";w_Dict["0".repeat(279)]="duononagintillion";w_Dict["0".repeat(282)]="trenonagintillion";w_Dict["0".repeat(285)]="quattuornonagintillion";w_Dict["0".repeat(288)]="quinnonagintillion";w_Dict["0".repeat(291)]="sexnonagintillion";w_Dict["0".repeat(294)]="septennonagintillion";w_Dict["0".repeat(297)]="octanonagintillion";w_Dict["0".repeat(300)]="novemnonagintillion";w_Dict["0".repeat(303)]="centillion";w_Dict["0".repeat(306)]="cenuntillion";w_Dict["0".repeat(309)]="cendotillion";w_Dict["0".repeat(312)]="centretillion";w_Dict["0".repeat(315)]="cenquattuortillion";w_Dict["0".repeat(318)]="cenquintillion";w_Dict["0".repeat(321)]="censextillion";w_Dict["0".repeat(324)]="censeptentillion";w_Dict["0".repeat(327)]="cenoctotillion";w_Dict["0".repeat(330)]="cennovemtillion";w_Dict["0".repeat(333)]="cendecillion";w_Dict["0".repeat(336)]="cenundecillion";w_Dict["0".repeat(339)]="cendodecillion";w_Dict["0".repeat(342)]="centredecillion";w_Dict["0".repeat(345)]="cenquattuordecillion";w_Dict["0".repeat(348)]="cenquindecillion";w_Dict["0".repeat(351)]="censexdecillion";w_Dict["0".repeat(354)]="censeptendecillion";w_Dict["0".repeat(357)]="cenoctodecillion";w_Dict["0".repeat(360)]="cennovemdecillion";w_Dict["0".repeat(363)]="cenvigintillion";w_Dict["0".repeat(366)]="cenunvigintillion";w_Dict["0".repeat(369)]="cendovigintillion";w_Dict["0".repeat(372)]="centrevigintillion";w_Dict["0".repeat(375)]="cenquattuorvigintillion";w_Dict["0".repeat(378)]="cenquinvigintillion";w_Dict["0".repeat(381)]="censexvigintillion";w_Dict["0".repeat(384)]="censeptenvigintillion";w_Dict["0".repeat(387)]="cenoctovigintillion";w_Dict["0".repeat(390)]="cennovemvigintillion";w_Dict["0".repeat(393)]="centrigintillion";w_Dict["0".repeat(396)]="cenuntrigintillion";w_Dict["0".repeat(399)]="cendotrigintillion";w_Dict["0".repeat(402)]="centretrigintillion";w_Dict["0".repeat(405)]="cenquattuortrigintillion";w_Dict["0".repeat(408)]="cenquintrigintillion";w_Dict["0".repeat(411)]="censextrigintillion";w_Dict["0".repeat(414)]="censeptentrigintillion";w_Dict["0".repeat(417)]="cenoctotrigintillion";w_Dict["0".repeat(420)]="cennovemtrigintillion";w_Dict["0".repeat(423)]="cenquadragintillion";w_Dict["0".repeat(426)]="cenunquadragintillion";w_Dict["0".repeat(429)]="cendoquadragintillion";w_Dict["0".repeat(432)]="centrequadragintillion";w_Dict["0".repeat(435)]="cenquattuorquadragintillion";w_Dict["0".repeat(438)]="cenquinquadragintillion";w_Dict["0".repeat(441)]="censexquadragintillion";w_Dict["0".repeat(444)]="censeptenquadragintillion";w_Dict["0".repeat(447)]="cenoctoquadragintillion";w_Dict["0".repeat(450)]="cennovemquadragintillion";w_Dict["0".repeat(453)]="cenquinquagintillion";w_Dict["0".repeat(456)]="cenunquinquagintillion";w_Dict["0".repeat(459)]="cendoquinquagintillion";w_Dict["0".repeat(462)]="centrequinquagintillion";w_Dict["0".repeat(465)]="cenquattuorquinquagintillion";w_Dict["0".repeat(468)]="cenquinquinquagintillion";w_Dict["0".repeat(471)]="censexquinquagintillion";w_Dict["0".repeat(474)]="censeptenquinquagintillion";w_Dict["0".repeat(477)]="cenoctoquinquagintillion";w_Dict["0".repeat(480)]="cennovemquinquagintillion";w_Dict["0".repeat(483)]="censexagintillion";w_Dict["0".repeat(486)]="cenunsexagintillion";w_Dict["0".repeat(489)]="cendosexagintillion";w_Dict["0".repeat(492)]="centresexagintillion";w_Dict["0".repeat(495)]="cenquattuorsexagintillion";w_Dict["0".repeat(498)]="cenquinsexagintillion";w_Dict["0".repeat(501)]="censexsexagintillion";w_Dict["0".repeat(504)]="censeptensexagintillion";w_Dict["0".repeat(507)]="cenoctosexagintillion";w_Dict["0".repeat(510)]="cennovemsexagintillion";w_Dict["0".repeat(513)]="censeptuagintillion";w_Dict["0".repeat(516)]="cenunseptuagintillion";w_Dict["0".repeat(519)]="cendoseptuagintillion";w_Dict["0".repeat(522)]="centreseptuagintillion";w_Dict["0".repeat(525)]="cenquattuorseptuagintillion";w_Dict["0".repeat(528)]="cenquinseptuagintillion";w_Dict["0".repeat(531)]="censexseptuagintillion";w_Dict["0".repeat(534)]="censeptenseptuagintillion";w_Dict["0".repeat(537)]="cenoctoseptuagintillion";w_Dict["0".repeat(540)]="cennovemseptuagintillion";w_Dict["0".repeat(543)]="cenoctogintillion";w_Dict["0".repeat(546)]="cenunoctogintillion";w_Dict["0".repeat(549)]="cendooctogintillion";w_Dict["0".repeat(552)]="centreoctogintillion";w_Dict["0".repeat(555)]="cenquattuoroctogintillion";w_Dict["0".repeat(558)]="cenquinoctogintillion";w_Dict["0".repeat(561)]="censexoctogintillion";w_Dict["0".repeat(564)]="censeptenoctogintillion";w_Dict["0".repeat(567)]="cenoctooctogintillion";w_Dict["0".repeat(570)]="cennovemoctogintillion";w_Dict["0".repeat(573)]="cennonagintillion";w_Dict["0".repeat(576)]="cenunnonagintillion";w_Dict["0".repeat(579)]="cendononagintillion";w_Dict["0".repeat(582)]="centrenonagintillion";w_Dict["0".repeat(585)]="cenquattuornonagintillion";w_Dict["0".repeat(588)]="cenquinnonagintillion";w_Dict["0".repeat(591)]="censexnonagintillion";w_Dict["0".repeat(594)]="censeptennonagintillion";w_Dict["0".repeat(597)]="cenoctononagintillion";w_Dict["0".repeat(600)]="cennovemnonagintillion";w_Dict["0".repeat(603)]="duocentillion";w_Dict["0".repeat(606)]="duocenuntillion";w_Dict["0".repeat(609)]="duocendotillion";w_Dict["0".repeat(612)]="duocentretillion";w_Dict["0".repeat(615)]="duocenquattuortillion";w_Dict["0".repeat(618)]="duocenquintillion";w_Dict["0".repeat(621)]="duocensextillion";w_Dict["0".repeat(624)]="duocenseptentillion";w_Dict["0".repeat(627)]="duocenoctotillion";w_Dict["0".repeat(630)]="duocennovemtillion";w_Dict["0".repeat(633)]="duocendecillion";w_Dict["0".repeat(636)]="duocenundecillion";w_Dict["0".repeat(639)]="duocendodecillion";w_Dict["0".repeat(642)]="duocentredecillion";w_Dict["0".repeat(645)]="duocenquattuordecillion";w_Dict["0".repeat(648)]="duocenquindecillion";w_Dict["0".repeat(651)]="duocensexdecillion";w_Dict["0".repeat(654)]="duocenseptendecillion";w_Dict["0".repeat(657)]="duocenoctodecillion";w_Dict["0".repeat(660)]="duocennovemdecillion";w_Dict["0".repeat(663)]="duocenvigintillion";w_Dict["0".repeat(666)]="duocenunvigintillion";w_Dict["0".repeat(669)]="duocendovigintillion";w_Dict["0".repeat(672)]="duocentrevigintillion";w_Dict["0".repeat(675)]="duocenquattuorvigintillion";w_Dict["0".repeat(678)]="duocenquinvigintillion";w_Dict["0".repeat(681)]="duocensexvigintillion";w_Dict["0".repeat(684)]="duocenseptenvigintillion";w_Dict["0".repeat(687)]="duocenoctovigintillion";w_Dict["0".repeat(690)]="duocennovemvigintillion";w_Dict["0".repeat(693)]="duocentrigintillion";w_Dict["0".repeat(696)]="duocenuntrigintillion";w_Dict["0".repeat(699)]="duocendotrigintillion";w_Dict["0".repeat(702)]="duocentretrigintillion";w_Dict["0".repeat(705)]="duocenquattuortrigintillion";w_Dict["0".repeat(708)]="duocenquintrigintillion";w_Dict["0".repeat(711)]="duocensextrigintillion";w_Dict["0".repeat(714)]="duocenseptentrigintillion";w_Dict["0".repeat(717)]="duocenoctotrigintillion";w_Dict["0".repeat(720)]="duocennovemtrigintillion";w_Dict["0".repeat(723)]="duocenquadragintillion";w_Dict["0".repeat(726)]="duocenunquadragintillion";w_Dict["0".repeat(729)]="duocendoquadragintillion";w_Dict["0".repeat(732)]="duocentrequadragintillion";w_Dict["0".repeat(735)]="duocenquattuorquadragintillion";w_Dict["0".repeat(738)]="duocenquinquadragintillion";w_Dict["0".repeat(741)]="duocensexquadragintillion";w_Dict["0".repeat(744)]="duocenseptenquadragintillion";w_Dict["0".repeat(747)]="duocenoctoquadragintillion";w_Dict["0".repeat(750)]="duocennovemquadragintillion";w_Dict["0".repeat(753)]="duocenquinquagintillion";w_Dict["0".repeat(756)]="duocenunquinquagintillion";w_Dict["0".repeat(759)]="duocendoquinquagintillion";w_Dict["0".repeat(762)]="duocentrequinquagintillion";w_Dict["0".repeat(765)]="duocenquattuorquinquagintillion";w_Dict["0".repeat(768)]="duocenquinquinquagintillion";w_Dict["0".repeat(771)]="duocensexquinquagintillion";w_Dict["0".repeat(774)]="duocenseptenquinquagintillion";w_Dict["0".repeat(777)]="duocenoctoquinquagintillion";w_Dict["0".repeat(780)]="duocennovemquinquagintillion";w_Dict["0".repeat(783)]="duocensexagintillion";w_Dict["0".repeat(786)]="duocenunsexagintillion";w_Dict["0".repeat(789)]="duocendosexagintillion";w_Dict["0".repeat(792)]="duocentresexagintillion";w_Dict["0".repeat(795)]="duocenquattuorsexagintillion";w_Dict["0".repeat(798)]="duocenquinsexagintillion";w_Dict["0".repeat(801)]="duocensexsexagintillion";w_Dict["0".repeat(804)]="duocenseptensexagintillion";w_Dict["0".repeat(807)]="duocenoctosexagintillion";w_Dict["0".repeat(810)]="duocennovemsexagintillion";w_Dict["0".repeat(813)]="duocenseptuagintillion";w_Dict["0".repeat(816)]="duocenunseptuagintillion";w_Dict["0".repeat(819)]="duocendoseptuagintillion";w_Dict["0".repeat(822)]="duocentreseptuagintillion";w_Dict["0".repeat(825)]="duocenquattuorseptuagintillion";w_Dict["0".repeat(828)]="duocenquinseptuagintillion";w_Dict["0".repeat(831)]="duocensexseptuagintillion";w_Dict["0".repeat(834)]="duocenseptenseptuagintillion";w_Dict["0".repeat(837)]="duocenoctoseptuagintillion";w_Dict["0".repeat(840)]="duocennovemseptuagintillion";w_Dict["0".repeat(843)]="duocenoctogintillion";w_Dict["0".repeat(846)]="duocenunoctogintillion";w_Dict["0".repeat(849)]="duocendooctogintillion";w_Dict["0".repeat(852)]="duocentreoctogintillion";w_Dict["0".repeat(855)]="duocenquattuoroctogintillion";w_Dict["0".repeat(858)]="duocenquinoctogintillion";w_Dict["0".repeat(861)]="duocensexoctogintillion";w_Dict["0".repeat(864)]="duocenseptenoctogintillion";w_Dict["0".repeat(867)]="duocenoctooctogintillion";w_Dict["0".repeat(870)]="duocennovemoctogintillion";w_Dict["0".repeat(873)]="duocennonagintillion";w_Dict["0".repeat(876)]="duocenunnonagintillion";w_Dict["0".repeat(879)]="duocendononagintillion";w_Dict["0".repeat(882)]="duocentrenonagintillion";w_Dict["0".repeat(885)]="duocenquattuornonagintillion";w_Dict["0".repeat(888)]="duocenquinnonagintillion";w_Dict["0".repeat(891)]="duocensexnonagintillion";w_Dict["0".repeat(894)]="duocenseptennonagintillion";w_Dict["0".repeat(897)]="duocenoctononagintillion";w_Dict["0".repeat(900)]="duocennovemnonagintillion";w_Dict["0".repeat(903)]="trecentillion";w_Dict["0".repeat(906)]="trecenuntillion";w_Dict["0".repeat(909)]="trecendotillion";w_Dict["0".repeat(912)]="trecentretillion";w_Dict["0".repeat(915)]="trecenquattuortillion";w_Dict["0".repeat(918)]="trecenquintillion";w_Dict["0".repeat(921)]="trecensextillion";w_Dict["0".repeat(924)]="trecenseptentillion";w_Dict["0".repeat(927)]="trecenoctotillion";w_Dict["0".repeat(930)]="trecennovemtillion";w_Dict["0".repeat(933)]="trecendecillion";w_Dict["0".repeat(936)]="trecenundecillion";w_Dict["0".repeat(939)]="trecendodecillion";w_Dict["0".repeat(942)]="trecentredecillion";w_Dict["0".repeat(945)]="trecenquattuordecillion";w_Dict["0".repeat(948)]="trecenquindecillion";w_Dict["0".repeat(951)]="trecensexdecillion";w_Dict["0".repeat(954)]="trecenseptendecillion";w_Dict["0".repeat(957)]="trecenoctodecillion";w_Dict["0".repeat(960)]="trecennovemdecillion";w_Dict["0".repeat(963)]="trecenvigintillion";w_Dict["0".repeat(966)]="trecenunvigintillion";w_Dict["0".repeat(969)]="trecendovigintillion";w_Dict["0".repeat(972)]="trecentrevigintillion";w_Dict["0".repeat(975)]="trecenquattuorvigintillion";w_Dict["0".repeat(978)]="trecenquinvigintillion";w_Dict["0".repeat(981)]="trecensexvigintillion";w_Dict["0".repeat(984)]="trecenseptenvigintillion";w_Dict["0".repeat(987)]="trecenoctovigintillion";w_Dict["0".repeat(990)]="trecennovemvigintillion";w_Dict["0".repeat(993)]="trecentrigintillion";w_Dict["0".repeat(996)]="trecenuntrigintillion";w_Dict["0".repeat(999)]="trecendotrigintillion";w_Dict["0".repeat(1002)]="trecentretrigintillion";
	return w_Dict[w];
}

/*
*	Factorial 0 to 200
*	Precompiled factorial reduces computation time in calculting sine and cosine
*	But increases file size by 34kb
*/
BigArith.factorial = function(n){
var factorial = [
"1",
"1",
"2",
"6",
"24",
"120",
"720",
"5040",
"40320",
"362880",
"3628800",
"39916800",
"479001600",
"6227020800",
"87178291200",
"1307674368000",
"20922789888000",
"355687428096000",
"6402373705728000",
"121645100408832000",
"2432902008176640000",
"51090942171709440000",
"1124000727777607680000",
"25852016738884976640000",
"620448401733239439360000",
"15511210043330985984000000",
"403291461126605635584000000",
"10888869450418352160768000000",
"304888344611713860501504000000",
"8841761993739701954543616000000",
"265252859812191058636308480000000",
"8222838654177922817725562880000000",
"263130836933693530167218012160000000",
"8683317618811886495518194401280000000",
"295232799039604140847618609643520000000",
"10333147966386144929666651337523200000000",
"371993326789901217467999448150835200000000",
"13763753091226345046315979581580902400000000",
"523022617466601111760007224100074291200000000",
"20397882081197443358640281739902897356800000000",
"815915283247897734345611269596115894272000000000",
"33452526613163807108170062053440751665152000000000",
"1405006117752879898543142606244511569936384000000000",
"60415263063373835637355132068513997507264512000000000",
"2658271574788448768043625811014615890319638528000000000",
"119622220865480194561963161495657715064383733760000000000",
"5502622159812088949850305428800254892961651752960000000000",
"258623241511168180642964355153611979969197632389120000000000",
"12413915592536072670862289047373375038521486354677760000000000",
"608281864034267560872252163321295376887552831379210240000000000",
"30414093201713378043612608166064768844377641568960512000000000000",
"1551118753287382280224243016469303211063259720016986112000000000000",
"80658175170943878571660636856403766975289505440883277824000000000000",
"4274883284060025564298013753389399649690343788366813724672000000000000",
"230843697339241380472092742683027581083278564571807941132288000000000000",
"12696403353658275925965100847566516959580321051449436762275840000000000000",
"710998587804863451854045647463724949736497978881168458687447040000000000000",
"40526919504877216755680601905432322134980384796226602145184481280000000000000",
"2350561331282878571829474910515074683828862318181142924420699914240000000000000",
"138683118545689835737939019720389406345902876772687432540821294940160000000000000",
"8320987112741390144276341183223364380754172606361245952449277696409600000000000000",
"507580213877224798800856812176625227226004528988036003099405939480985600000000000000",
"31469973260387937525653122354950764088012280797258232192163168247821107200000000000000",
"1982608315404440064116146708361898137544773690227268628106279599612729753600000000000000",
"126886932185884164103433389335161480802865516174545192198801894375214704230400000000000000",
"8247650592082470666723170306785496252186258551345437492922123134388955774976000000000000000",
"544344939077443064003729240247842752644293064388798874532860126869671081148416000000000000000",
"36471110918188685288249859096605464427167635314049524593701628500267962436943872000000000000000",
"2480035542436830599600990418569171581047399201355367672371710738018221445712183296000000000000000",
"171122452428141311372468338881272839092270544893520369393648040923257279754140647424000000000000000",
"11978571669969891796072783721689098736458938142546425857555362864628009582789845319680000000000000000",
"850478588567862317521167644239926010288584608120796235886430763388588680378079017697280000000000000000",
"61234458376886086861524070385274672740778091784697328983823014963978384987221689274204160000000000000000",
"4470115461512684340891257138125051110076800700282905015819080092370422104067183317016903680000000000000000",
"330788544151938641225953028221253782145683251820934971170611926835411235700971565459250872320000000000000000",
"24809140811395398091946477116594033660926243886570122837795894512655842677572867409443815424000000000000000000",
"1885494701666050254987932260861146558230394535379329335672487982961844043495537923117729972224000000000000000000",
"145183092028285869634070784086308284983740379224208358846781574688061991349156420080065207861248000000000000000000",
"11324281178206297831457521158732046228731749579488251990048962825668835325234200766245086213177344000000000000000000",
"894618213078297528685144171539831652069808216779571907213868063227837990693501860533361810841010176000000000000000000",
"71569457046263802294811533723186532165584657342365752577109445058227039255480148842668944867280814080000000000000000000",
"5797126020747367985879734231578109105412357244731625958745865049716390179693892056256184534249745940480000000000000000000",
"475364333701284174842138206989404946643813294067993328617160934076743994734899148613007131808479167119360000000000000000000",
"39455239697206586511897471180120610571436503407643446275224357528369751562996629334879591940103770870906880000000000000000000",
"3314240134565353266999387579130131288000666286242049487118846032383059131291716864129885722968716753156177920000000000000000000",
"281710411438055027694947944226061159480056634330574206405101912752560026159795933451040286452340924018275123200000000000000000000",
"24227095383672732381765523203441259715284870552429381750838764496720162249742450276789464634901319465571660595200000000000000000000",
"2107757298379527717213600518699389595229783738061356212322972511214654115727593174080683423236414793504734471782400000000000000000000",
"185482642257398439114796845645546284380220968949399346684421580986889562184028199319100141244804501828416633516851200000000000000000000",
"16507955160908461081216919262453619309839666236496541854913520707833171034378509739399912570787600662729080382999756800000000000000000000",
"1485715964481761497309522733620825737885569961284688766942216863704985393094065876545992131370884059645617234469978112000000000000000000000",
"135200152767840296255166568759495142147586866476906677791741734597153670771559994765685283954750449427751168336768008192000000000000000000000",
"12438414054641307255475324325873553077577991715875414356840239582938137710983519518443046123837041347353107486982656753664000000000000000000000",
"1156772507081641574759205162306240436214753229576413535186142281213246807121467315215203289516844845303838996289387078090752000000000000000000000",
"108736615665674308027365285256786601004186803580182872307497374434045199869417927630229109214583415458560865651202385340530688000000000000000000000",
"10329978488239059262599702099394727095397746340117372869212250571234293987594703124871765375385424468563282236864226607350415360000000000000000000000",
"991677934870949689209571401541893801158183648651267795444376054838492222809091499987689476037000748982075094738965754305639874560000000000000000000000",
"96192759682482119853328425949563698712343813919172976158104477319333745612481875498805879175589072651261284189679678167647067832320000000000000000000000",
"9426890448883247745626185743057242473809693764078951663494238777294707070023223798882976159207729119823605850588608460429412647567360000000000000000000000",
"933262154439441526816992388562667004907159682643816214685929638952175999932299156089414639761565182862536979208272237582511852109168640000000000000000000000",
"93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000",
"9425947759838359420851623124482936749562312794702543768327889353416977599316221476503087861591808346911623490003549599583369706302603264000000000000000000000000",
"961446671503512660926865558697259548455355905059659464369444714048531715130254590603314961882364451384985595980362059157503710042865532928000000000000000000000000",
"99029007164861804075467152545817733490901658221144924830052805546998766658416222832141441073883538492653516385977292093222882134415149891584000000000000000000000000",
"10299016745145627623848583864765044283053772454999072182325491776887871732475287174542709871683888003235965704141638377695179741979175588724736000000000000000000000000",
"1081396758240290900504101305800329649720646107774902579144176636573226531909905153326984536526808240339776398934872029657993872907813436816097280000000000000000000000000",
"114628056373470835453434738414834942870388487424139673389282723476762012382449946252660360871841673476016298287096435143747350528228224302506311680000000000000000000000000",
"12265202031961379393517517010387338887131568154382945052653251412013535324922144249034658613287059061933743916719318560380966506520420000368175349760000000000000000000000000",
"1324641819451828974499891837121832599810209360673358065686551152497461815091591578895743130235002378688844343005686404521144382704205360039762937774080000000000000000000000000",
"144385958320249358220488210246279753379312820313396029159834075622223337844983482099636001195615259277084033387619818092804737714758384244334160217374720000000000000000000000000",
"15882455415227429404253703127090772871724410234473563207581748318444567162948183030959960131517678520479243672638179990208521148623422266876757623911219200000000000000000000000000",
"1762952551090244663872161047107075788761409536026565516041574063347346955087248316436555574598462315773196047662837978913145847497199871623320096254145331200000000000000000000000000",
"197450685722107402353682037275992488341277868034975337796656295094902858969771811440894224355027779366597957338237853638272334919686385621811850780464277094400000000000000000000000000",
"22311927486598136465966070212187151182564399087952213171022161345724023063584214692821047352118139068425569179220877461124773845924561575264739138192463311667200000000000000000000000000",
"2543559733472187557120132004189335234812341496026552301496526393412538629248600474981599398141467853800514886431180030568224218435400019580180261753940817530060800000000000000000000000000",
"292509369349301569068815180481773552003419272043053514672100535242441942363589054622883930786268803187059211939585703515345785120071002251720730101703194015956992000000000000000000000000000",
"33931086844518982011982560935885732032396635556994207701963662088123265314176330336254535971207181169698868584991941607780111073928236261199604691797570505851011072000000000000000000000000000",
"3969937160808720895401959629498630647790406360168322301129748464310422041758630649341780708631240196854767624444057168110272995649603642560353748940315749184568295424000000000000000000000000000",
"468452584975429065657431236280838416439267950499862031533310318788629800927518416622330123618486343228862579684398745837012213486653229822121742374957258403779058860032000000000000000000000000000",
"55745857612076058813234317117419771556272886109483581752463927935846946310374691578057284710599874844234646982443450754604453404911734348832487342619913750049708004343808000000000000000000000000000",
"6689502913449127057588118054090372586752746333138029810295671352301633557244962989366874165271984981308157637893214090552534408589408121859898481114389650005964960521256960000000000000000000000000000",
"809429852527344373968162284544935082997082306309701607045776233628497660426640521713391773997910182738287074185078904956856663439318382745047716214841147650721760223072092160000000000000000000000000000",
"98750442008336013624115798714482080125644041369783596059584700502676714572050143649033796427745042294071023050579626404736512939596842694895821378210620013388054747214795243520000000000000000000000000000",
"12146304367025329675766243241881295855454217088483382315328918161829235892362167668831156960612640202170735835221294047782591091570411651472186029519906261646730733907419814952960000000000000000000000000000",
"1506141741511140879795014161993280686076322918971939407100785852066825250652908790935063463115967385069171243567440461925041295354731044782551067660468376444194611004520057054167040000000000000000000000000000",
"188267717688892609974376770249160085759540364871492425887598231508353156331613598866882932889495923133646405445930057740630161919341380597818883457558547055524326375565007131770880000000000000000000000000000000",
"23721732428800468856771473051394170805702085973808045661837377170052497697783313457227249544076486314839447086187187275319400401837013955325179315652376928996065123321190898603130880000000000000000000000000000000",
"3012660018457659544809977077527059692324164918673621799053346900596667207618480809067860692097713761984609779945772783965563851033300772326297773087851869982500270661791244122597621760000000000000000000000000000000",
"385620482362580421735677065923463640617493109590223590278828403276373402575165543560686168588507361534030051833058916347592172932262498857766114955245039357760034644709279247692495585280000000000000000000000000000000",
"49745042224772874403902341504126809639656611137138843145968864022652168932196355119328515747917449637889876686464600208839390308261862352651828829226610077151044469167497022952331930501120000000000000000000000000000000",
"6466855489220473672507304395536485253155359447828049608975952322944781961185526165512707047229268452925683969240398027149120740074042105844737747799459310029635780991774612983803150965145600000000000000000000000000000000",
"847158069087882051098456875815279568163352087665474498775849754305766436915303927682164623187034167333264599970492141556534816949699515865660644961729169613882287309922474300878212776434073600000000000000000000000000000000",
"111824865119600430744996307607616902997562475571842633838412167568361169672820118454045730260688510087990927196104962685462595837360336094267205134948250389032461924909766607715924086489297715200000000000000000000000000000000",
"14872707060906857289084508911813048098675809251055070300508818286592035566485075754388082124671571841702793317081960037166525246368924700537538282948117301741317436012998958826217903503076596121600000000000000000000000000000000",
"1992942746161518876737324194182948445222558439641379420268181650403332765909000151088003004705990626788174304488982644980314383013435909872030129915047718433336536425741860482713199069412263880294400000000000000000000000000000000",
"269047270731805048359538766214698040105045389351586221736204522804449923397715020396880405635308734616403531106012657072342441706813847832724067538531441988500432417475151165166281874370655623839744000000000000000000000000000000000",
"36590428819525486576897272205198933454286172951815726156123815101405189582089242773975735166401987907830880230417721361838572072126683305250473185240276110436058808776620558462614334914409164842205184000000000000000000000000000000000",
"5012888748274991661034926292112253883237205694398754483388962668892510972746226260034675717797072343372830591567227826571884373881355612819314826377917827129740056802397016509378163883274055583382110208000000000000000000000000000000000",
"691778647261948849222819828311491035886734385827028118707676848307166514238979223884785249055995983385450621636277440066920043595627074569065446040152660143904127838730788278294186615891819670506731208704000000000000000000000000000000000",
"96157231969410890041971956135297253988256079629956908500367081914696145479218112119985149618783441690577636407442564169301886059792163365100096999581219760002673769583579570682891939608962934200435638009856000000000000000000000000000000000",
"13462012475717524605876073858941615558355851148193967190051391468057460367090535696797920946629681836680869097041958983702264048370902871114013579941370766400374327741701139895604871545254810788060989321379840000000000000000000000000000000000",
"1898143759076170969428526414110767793728175011895349373797246196996101911759765533248506853474785138972002542682916216702019230820297304827075914771733278062452780211579860725280286887880928321116599494314557440000000000000000000000000000000000",
"269536413788816277658850750803729026709400851689139611079208959973446471469886705721287973193419489734024361060974102771686730776482217285444779897586125484868294790044340222989800738079091821598557128192667156480000000000000000000000000000000000",
"38543707171800727705215657364933250819444321791546964384326881276202845420193798918144180166658987031965483631719296696351202501036957071818603525354815944336166154976340651887541505545310130488593669331551403376640000000000000000000000000000000000",
"5550293832739304789551054660550388117999982337982762871343070903773209740507907044212761943998894132603029642967578724274573160149321818341878907651093495984407926316593053871805976798524658790357488383743402086236160000000000000000000000000000000000",
"804792605747199194484902925779806277109997439007500616344745281047115412373646521410850481879839649227439298230298915019813108221651663659572441609408556917739149315905992811411866635786075524601835815642793302504243200000000000000000000000000000000000",
"117499720439091082394795827163851716458059626095095089986332811032878850206552392125984170354456588787206137541623641592892713800361142894297576474973649309989915800122274950466132528824767026591868029083847822165619507200000000000000000000000000000000000",
"17272458904546389112034986593086202319334765035978978227990923221833190980363201642519673042105118551719302218618675314155228928653088005461743741821126448568517622617974417718521481737240752909004600275325629858346067558400000000000000000000000000000000000",
"2556323917872865588581178015776757943261545225324888777742656636831312265093753843092911610231557545654456728355563946494973881440657024808338073789526714388140608147460213822341179297111631430532680840748193219035217998643200000000000000000000000000000000000",
"380892263763056972698595524350736933545970238573408427883655838887865527498969322620843829924502074302514052524979028027751108334657896696442372994639480443832950613971571859528835715269633083149369445271480789636247481797836800000000000000000000000000000000000",
"57133839564458545904789328652610540031895535786011264182548375833179829124845398393126574488675311145377107878746854204162666250198684504466355949195922066574942592095735778929325357290444962472405416790722118445437122269675520000000000000000000000000000000000000",
"8627209774233240431623188626544191544816225903687700891564804750810154197851655157362112747789971982951943289690774984828562603780001360174419748328584232052816331406456102618328128950857189333333217935399039885261005462721003520000000000000000000000000000000000000",
"1311335885683452545606724671234717114812066337360530535517850322123143438073451583919041137664075741408695380032997797693941515774560206746511801745944803272028082373781327597985875600530292778666649126180654062559672830333592535040000000000000000000000000000000000000",
"200634390509568239477828874698911718566246149616161171934231099284840946025238092339613294062603588435530393145048663047173051913507711632216305667129554900620296603188543122491838966881134795135997316305640071571629943041039657861120000000000000000000000000000000000000",
"30897696138473508879585646703632404659201907040888820477871589289865505687886666220300447285640952619071680544337494109264649994680187591361311072737951454695525676891035640863743200899694758450943586711068571022031011228320107310612480000000000000000000000000000000000000",
"4789142901463393876335775239063022722176295591337767174070096339929153381622433264146569329274347655956110484372311586936020749175429076661003216274382475477806479918110524333880196139452687559896255940215628508414806740389616633144934400000000000000000000000000000000000000",
"747106292628289444708380937293831544659502112248691679154935029028947927533099589206864815366798234329153235562080607562019236871366935959116501738803666174537810867225241796085310597754619259343815926673638047312709851500780194770609766400000000000000000000000000000000000000",
"117295687942641442819215807155131552511541831623044593627324799557544824622696635505477776012587322789677057983246655387237020188804608945581290772992175589402436306154362961985393763847475223716979100487761173428095446685622490578985733324800000000000000000000000000000000000000",
"18532718694937347965436097530510785296823609396441045793117318330092082290386068409865488609988797000768975161352971551183449189831128213401843942132763743125584936372389347993692214687901085347282697877066265401639080576328353511479745865318400000000000000000000000000000000000000",
"2946702272495038326504339507351214862194953894034126281105653614484641084171384877168612688988218723122267050655122476638168421183149385930893186799109435156968004883209906330997062135376272570217948962453536198860613811636208208325279592585625600000000000000000000000000000000000000",
"471472363599206132240694321176194377951192623045460204976904578317542573467421580346978030238114995699562728104819596262106947389303901748942909887857509625114880781313585012959529941660203611234871833992565791817698209861793313332044734813700096000000000000000000000000000000000000000",
"75907050539472187290751785709367294850142012310319093001281637109124354328254874435863462868336514307629599224875954998199218529677928181579808491945059049643495805791487187086484320607292781408814365272803092482649411787748723446459202305005715456000000000000000000000000000000000000000",
"12296942187394494341101789284917501765723005994271693066207625211678145401177289658609880984670515317835995074429904709708273401807824365415928975695099566042246320538220924308010459938381430588227927174194100982189204709615293198326390773410925903872000000000000000000000000000000000000000",
"2004401576545302577599591653441552787812849977066285969791842909503537700391898214353410600501293996807267197132074467682448564494675371562796423038301229264886150247730010662205704969956173185881152129393638460096840367667292791327201696065980922331136000000000000000000000000000000000000000",
"328721858553429622726333031164414657201307396238870899045862237158580182864271307153959338482212215476391820329660212699921564577126760936298613378281401599441328640627721748601735615072812402484508949220556707455881820297436017777661078154820871262306304000000000000000000000000000000000000000",
"54239106661315887749844950142128418438215720379413698342567269131165730172604765680403290849565015553604650354393935095487058155225915554489271207416431263907819225703574088519286376487014046409943976621391856730220500349076942933314077895545443758280540160000000000000000000000000000000000000000",
"9003691705778437366474261723593317460743809582982673924866166675773511208652391102946946281027792581898371958829393225850851653767501982045219020431127589808697991466793298694201538496844331704050700119151048217216603057946772526930136930660543663874569666560000000000000000000000000000000000000000",
"1503616514864999040201201707840084015944216200358106545452649834854176371844949314192140028931641361177028117124508668717092226179172831001551576411998307498052564574954480881931656928973003394576466919898225052275172710677111011997332867420310791867053134315520000000000000000000000000000000000000000",
"252607574497319838753801886917134114678628321660161899636045172255501630469951484784279524860515748677740723676917456344471493998101035608260664837215715659672830848592352788164518364067464570288846442542901808782229015393754650015551921726612213033664926565007360000000000000000000000000000000000000000",
"42690680090047052749392518888995665380688186360567361038491634111179775549421800928543239701427161526538182301399050122215682485679075017796052357489455946484708413412107621199803603527401512378815048789750405684196703601544535852628274771797464002689372589486243840000000000000000000000000000000000000000",
"7257415615307998967396728211129263114716991681296451376543577798900561843401706157852350749242617459511490991237838520776666022565442753025328900773207510902400430280058295603966612599658257104398558294257568966313439612262571094946806711205568880457193340212661452800000000000000000000000000000000000000000",
"1241018070217667823424840524103103992616605577501693185388951803611996075221691752992751978120487585576464959501670387052809889858690710767331242032218484364310473577889968548278290754541561964852153468318044293239598173696899657235903947616152278558180061176365108428800000000000000000000000000000000000000000",
"213455108077438865629072570145733886730056159330291227886899710221263324938130981514753340236723864719151973034287306573083301055694802251980973629541579310661401455397074590303866009781148657954570396550703618437210885875866741044575478989978191912006970522334798649753600000000000000000000000000000000000000000",
"36927733697396923753829554635211962404299715564140382424433649868278555214296659802052327860953228596413291334931704037143411082635200789592708437910693220744422451783693904122568819692138717826140678603271725989637483256524946200711557865266227200777205900363920166407372800000000000000000000000000000000000000000",
"6425425663347064733166342506526881458348150508160426541851455077080468607287618805557105047805861775775912692278116502462953528378524937389131268196460620409529506610362739317326974626432136901748478076969280322196922086635340638923811068556323532935233826663322108954882867200000000000000000000000000000000000000000",
"1124449491085736328304109938642204255210926338928074644824004638489082006275333290972493383366025810760784721148670387931016867466241864043097971934380608571667663656813479380532220559625623957805983663469624056384461365161184611811666936997356618263665919666081369067104501760000000000000000000000000000000000000000000",
"197903110431089593781523349201027948917123035651341137489024816374078433104458659211158835472420542693898110922165988275858968674058568071585243060450987108613508803599172370973670818494109816573853124770653833923665200268368491678853380911534764814405201861230320955810392309760000000000000000000000000000000000000000000",
"35028850546302858099329632808581946958330777310287381335557392498211882659489182680375113878618436056819965633223379924827037455308366548670588021699824718224591058237053509662339734873457437533572003084405728604488740447501223027157048421341653372149720729437766809178439438827520000000000000000000000000000000000000000000",
"6235135397241908741680674639927586558582878361231153877729215864681715113389074517106770270394081618113953882713761626619212667044889245663364667862568799843977208366195524719896472807475423880975816549024219691598995799655217698833954618998814300242650289839922492033762220111298560000000000000000000000000000000000000000000",
"1116089236106301664760840760547037993986335226660376544113529639778027005296644338562111878400540609642397745005763331164839067401035174973742275547399815172071920297548998924861468632538100874694671162275335324796220248138283968091277876800787759743434401881346126074043437399922442240000000000000000000000000000000000000000000",
"200896062499134299656951336898466838917540340798867777940435335160044860953395980941180138112097309735631594101037399609671032132186331495273609598531966730972945653558819806475064353856858157445040809209560358463319644664891114256430017824141796753818192338642302693327818731986039603200000000000000000000000000000000000000000000",
"36362187312343308237908191978622497844074801684595067807218795663968119832564672550353604998289613062149318532287769329350456815925726000644523337334285978306103163294146384971986648048091326497552386466930424881860855684345291680413833226169665212441092813294256787492335190489473168179200000000000000000000000000000000000000000000",
"6617918090846482099299290940109294607621613906596302340913820810842197809526770404164356109688709577311175972876374017941783140498482132117303247394840048051710775719534642064901569944752621422554534336981337328498675734550843085835317647162879068664278892019554735323605004669084116608614400000000000000000000000000000000000000000000",
"1211079010624906224171770242040000913194755344907123328387229208384122199143398983962077168073033852647945203036376445283346314711222230177466494273255728793463071956674839497876987299889729720327479783667584731115257659422804284707863129430806869565563037239578516564219715854442393339376435200000000000000000000000000000000000000000000",
"222838537954982745247605724535360168027834983462910692423250174342678484642385413049022198925438228887221917358693265932135721906864890352653834946279054097997205240028170467609365663179710268540256280194835590525207409333795988386246815815268464000063598852082447047816427717217400374445264076800000000000000000000000000000000000000000000",
"41225129521671807870807059039041631085149471940638478098301282253395519658841301414069106801206072344136054711358254197445108552770004715240959465061625008129482969405211536507732647688246399679947411836044584247163370726752257851455660925824665840011765787635252703846039127685219069272373854208000000000000000000000000000000000000000000000",
"7667874091030956263970112981261743381837801780958756926284038499131566656544482063016853865024329456009306176312635280724790190815220877034818460501462251512083832309369345790438272470013830340470218601504292669972386955175919960370752932203387846242188436500157002915363277749450746884661536882688000000000000000000000000000000000000000000000",
"1433892455022788821362411127495946012403668933039287545215115199337602964773818145784151672759549608273740254970462797495535765682446304005511052113773441032759676641852067662811956951892586273667930878481302729284836360617897032589330798322033527247289237625529359545172932939147289667431707397062656000000000000000000000000000000000000000000000",
"269571781544284298416133291969237850331889759411386058500441657475469357377477811407420514478795326355463167934447005929160723948299905153036077797389406914158819208668188720608647906955806219449571005154484913105549235796164642126794190084542303122490376673599519594492511392559690457477160990647779328000000000000000000000000000000000000000000000",
"50949066711869732400649192182185953712727164528751965056583473262863708544343306356002477236492316681182538739610484120611376826228682073923818703706597906776016830438287668195034454414647375475968919974197648576948805565475117361964101925978495290150681191310309203359084653193781496463183427232430292992000000000000000000000000000000000000000000000",
"9680322675255249156123346514615331205418161260462873360750859919944104623425228207640470674933540169424682360525991982916161596983449594045525553704253602287443197783274656957056546338783001340434094795097553229620273057440272298773179365935914105128629426348958748638226084106818484328004851174161755668480000000000000000000000000000000000000000000000",
"1848941630973752588819559184291528260234868800748408811903414244709323983074218587659329898912306172360114330860464468736986865023838872462695380757512438036901650776605459478797800350707553256022912105863632666857472153971092009065677258893759594079568220432651120989901182064402330506648926574264895332679680000000000000000000000000000000000000000000000",
"354996793146960497053355363383973425965094809743694491885455534984190204750249968830591340591162785093141951525209177997501478084577063512837513105442388103085116949108248219929177667335850225156399124325817472036634653562449665740610033707601842063277098323069015230061026956365247457276593902258859903874498560000000000000000000000000000000000000000000000",
"68514381077363375931297585133106871211263298280533036933892918251948709516798243984304128734094417522976396644365371353517785270323373257977640029350380903895427571177891906446331289795819093455185030994882772103070488137552785487937736505567155518212479976352319939401778202578492759254382623135959961447778222080000000000000000000000000000000000000000000000",
"13291789929008494930671731515822733014985079866423409165175226140878049646258859332955000974414316999457420949006882042582450342442734412047662165693973895355712948808511029850588270220388904130305896013007257787995674698685240384659920882080028170533221115412350068243944971300227595295350228888376232520868975083520000000000000000000000000000000000000000000000",
"2591899036156656511480987645585432937922090573952564787209169097471219681020477569926225190010791814894197085056341998303577816776333210349294122310324909594364025017659650820864712692975836305409649722536415268659156566243621875008684572005605493253978117505408263307569269403544381082593294633233365341569450141286400000000000000000000000000000000000000000000000",
"508012211086704676250273578534744855832729752494702698292997143104359057480013603705540137242115195719262628671043031667501252088161309228461647972823682280495348903461291560889483687823263915860291345617137392657194686983749887501702176113098676677779711031060019608283576803094698692188285748113739606947612227692134400000000000000000000000000000000000000000000000",
"100078405584080821221303894971344736599047761241456431563720437191558734323562679929991407036696693556694737848195477238497746661367777918006944650646265409257583733981874437495228286501182991424477395086576066353467353335798727837835328694280439305522603073118823862831864630209655642361092292378406702568679608855350476800000000000000000000000000000000000000000000000",
"19815524305648002601818171204326257846611456725808373449616646563928629396065410626138298593265945324225558093942704493222553838950820027765375040827960551033001579328411138624055200727234232302046524227142061137986535960488148111891395081467526982493475408477527124840709196781511817187496273890924527108598562553359394406400000000000000000000000000000000000000000000000",
"3943289336823952517761816069660925311475679888435866316473712666221797249817016714601521420059923119520886060694598194151288213951213185525309633124764149655567314286353816586186984944719612228107258321201270166459320656137141474266387621212037869516201606287027897843301130159520851620311758504293980894611113948118519486873600000000000000000000000000000000000000000000000",
"788657867364790503552363213932185062295135977687173263294742533244359449963403342920304284011984623904177212138919638830257642790242637105061926624952829931113462857270763317237396988943922445621451664240254033291864131227428294853277524242407573903240321257405579568660226031904170324062351700858796178922222789623703897374720000000000000000000000000000000000000000000000000"];
return factorial[n];
};

if(typeof module != 'undefined') module.exports = BigArith;