/**	
*	BigArith.js - Written by Oso Oluwafemi Ebenezer
*	The constructor for BigArith
*	@param {string|number|null|BigArith} n Accepts no parameter, or number within the safe integer limit or string in "-123.456" form or  
*	"negative one hundred and twenty three point four five six" form or a constant "PI" form or a BigArith object
*	Dependent on verify(), name() getter
*/
var BigArith=function(n){
	//version
	Object.defineProperty(this, 'version', {
		writable: false,
		value: "v0.0-beta0.4",
	});
	
	//Object name
	Object.defineProperty(this, 'name', {
		writable: false,
		value: "BigArith"
	});
	
	//Word support 
	Object.defineProperty(this, 'wordSupport', {
		writable: false,
		value: 1002 //up to 1x10^1,005 - 0.0{199}1
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
	if(BigArith.compare(n,0) == 0) return new BigArith(result);
	
	//If we got here that means we have reminders
	n = BigArith.multiply(n, 100);
	result +=  ".";
	for(var count = 0; BigArith.compare(count, new BigArith().decimalSupport+1) <= 0; count++){
		// take quotient double it and multiply by 10
		var j = BigArith.multiply(quotient, 20); 
		
		//Find a number bewteen j+1 and j+9 such that (j+i)*i will just be less than or equal to n
		var i = 1;
		for(; i <= 9; i++){
			var g = BigArith.multiply(BigArith.add(j,i), i); //(j+i)*i
			if(BigArith.compare(g, n) >= 0 || BigArith.compare(n, 0) == 0) break;
		}
		//If (j+i)*i > n or i == 10, reduce i by 1
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
*	Returns the perfect square just below or equals to n
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
*	@param {string|number|BigArth} - optional - zero or more parameters
*	@returns {BigArith} - The smallest number between parameters
*	Dependent on static compare(), valueOf()
*/
BigArith.min=function(){
	var args = arguments;
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
*	@param {string|number|BigArth} - optional - zero or more parameters
*	@returns {BigArith} - The largest number between parameters
*	Dependent on static compare(), valueOf()
*/
BigArith.max=function(){
	var args = arguments;
	var result = new BigArith(args[0]);
	for(var i = 0; i < args.length; i++){
		if(isNaN(new BigArith(args[i]).valueOf())) return NaN;
		result = (BigArith.compare(result, args[i]) == 1)?result:new BigArith(args[i]);
	}
	return result;
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
*	@param {string} - this.value e.g "0.5"
*	@returns {BigArith} - this.value rounded to nearest whole number e.g "1"
*	Dependent on toString(), static compare(), isPositive(), add(), subtract()
*/
BigArith.prototype.round=function(){
	var n = this.value;
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

//TODO==========
BigArith.prototype.toFixed=function(d){
	return BigArith.toFixed(this.value, d);
}

//TODO==========
BigArith.toFixed=function(n, d){
	var e = new BigArith(d).floor().toString();
	if(BigArith.compare(d, 0) == -1 || BigArith.compare(d, new BigArith().decimalSupport) == 1 || isNaN(e)) throw new Error("Argument must be between 0 and "+ new BigArith().decimalSupport +"! " + e + " supplied.");
	var n = new BigArith(n);
	if(!n.isInteger()){
		n = n.toString().split(".");
		if(BigArith.compare(e, "0") == 0){
			if(BigArith.compare(n[1][0], "5") >= 0){
				n[0] = BigArith.add(n[0], "1").toString();
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
	else n=n+((BigArith.compare(e, "0") == 1)?("."+"0".repeat(e)):"");
	return n; 
}

/**	
*	Random number between 0 and 1 (1 exclusive)
*	function random
*	@returns {string} - any number between 0 and 1 (1 exclusive)
*	Dependent on Math.random(), floor(), toString(), valueOf()
*/
BigArith.random=function(){
	var len = new BigArith(Math.random()*201).floor().valueOf();
	var n = "0";
	for(var i = 0; i < len; i++){
		n += new BigArith(Math.random()*10).floor().toString();
	}
	return (n == "0")?n:("0."+n.slice(1));
}

/**	
*	Random integer between min and max (min inclusive, max exclusive) 
*	function randomInt
*	@param {number|string|BigArith} min minimum integer that can be returned (inclusive)
*	@param {number|string|BigArith} max maximum integer that can be returned (exclusive)
*	@returns {string} - any integer between min and max
*	Dependent on static random(), floor(), toString(), multiply(), subtract(), add()
*/
BigArith.randomInt=function(min, max){
	return (new BigArith(BigArith.random()).multiply(BigArith.subtract(max, min)).add(min)).floor().toString();
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
	
	if(a.isNegative() && b.isPositive()){
		signFlag = "-";
		a = a.abs();
	}
	if(a.isPositive() && b.isNegative()){
		signFlag = "-";
		b = b.abs();
	}
	if(a.isNegative() && b.isNegative()){
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
	var results = [];
	for(var i = a.length-1; i >= 0; i--){
		var subSum = "";
		var flag = 0;
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
		results.push(subSum);
	}
  
	var result = "0";
	for(var i = 0; i < results.length; i++){
		result = BigArith.add(result, results[i]+"0".repeat(i));
	}
	result = result.toString(); //It's a BigArith
	if(max*2 > result.length) result = "0".repeat(max*2 - result.length) + result; //Problem with slice if result is shorter than max*2
	result = result.slice(0, result.length - max*2) + "." + result.slice(result.length - max*2);
	result = result.replace(/^0+/g,"")/*Remove front zeros*/.replace(/\.0+$/g,"")/*Remove zeros after decimal point zeros*/;
	if(result[0] == ".") result = "0" + result;
	return ((result == "")? new BigArith("0") : new BigArith((signFlag+result)));
}

/**	Return this.value%n (reminder of this.value/n)
*	function modulus
*	@param {String|Number|BigArth} - n - the divisor with this.value as the dividend
*	@returns {BigArith} - reminder of this.value mod n
*/
BigArith.prototype.modulus=function(n){
	return BigArith.modulus(this.value, n);
}

/**	Return a%b (reminder of a/b)
*	function modulus
*	@param {String|Number|BigArth} - a - the dividend
*	@param {String|Number|BigArth} - b - the divisor.
*	@returns {BigArith} - reminder of a mod b
*/
BigArith.modulus=function(a, b){
	var a = new BigArith(a);
	var b = new BigArith(b);
	if(BigArith.compare(b, "0") == 0) return NaN;
	
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
	var count = 0;

	while(BigArith.compare(rem, "0") == 1 && BigArith.compare(count, new BigArith().decimalSupport+1) == -1){
		rem += "0";
		var j = BigArith.divWithRem(rem, b);
		remResult +=  j[0];
		rem = j[1];
		count++;
	}
	if(remResult == "0.") remResult = "0.0";
	result = result[0] + "." + remResult.split(".")[1];
	var dPosition = (result.indexOf(".") == -1)?result.length : result.indexOf(".");
	
	//Numerator decimal point means we shift the decimal point in answer forward
	//Denominator decimal point means we shift the decimal point in answer backward
	dPosition = dPosition+denominatorIndex-numeratorIndex;
	result = result.split(".");
	if(typeof result[1] == "undefined") result[1] = "0";
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
	
	if(BigArith.compare(count, new BigArith().decimalSupport+1) == 0)
		return new BigArith(new BigArith(result).toFixed(new BigArith().decimalSupport));
	else
		return new BigArith(result);
};

/**	Return a/b (division of a/b)
*	function divWithRem
*	@param {string|number|BigArth} a The dividend. Must always be integers.
*	@param {String|Number|BigArth} b The divisor. Must always be integers.
*	@returns {Array of integers} - [quotient, reminder]
*/
BigArith.divWithRem=function(a, b){
	var a = new BigArith(a);
	var b = new BigArith(b);
	if(isNaN(a) || isNaN(b))
		return NaN;
	
	if(!a.isInteger() || !b.isInteger()) throw new Error("divWithRem accepts only integers. Non integers passed in");
	if(BigArith.compare(b, 0) == 0) throw new RangeError("Division by zero");
	var signFlag = false;
	
	if((a.isNegative() || b.isNegative()) && !(a.isNegative() && b.isNegative())) signFlag = true;
	
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
				hold = BigArith.subtract(hold,b);
				count++;
			}
			result += count;
		}
		aSub = hold;
	}
	if(aSub.length > 1 && aSub[0] == "0"){
		hold = new BigArith(aSub).toString();
	}
	result = result.replace(/^0*/g,"");
	result = (result == "")? "0" : result;
	return [((signFlag)?"-":"")+result, hold];
};
	
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
	w_Dict["thousand"] = "0".repeat(3); w_Dict["million"]="0".repeat(6);w_Dict["billion"]="0".repeat(9);w_Dict["trillion"]="0".repeat(12);w_Dict["quadrillion"]="0".repeat(15);w_Dict["quintillion"]="0".repeat(18);w_Dict["sextillion"]="0".repeat(21);w_Dict["septillion"]="0".repeat(24);w_Dict["octillion"]="0".repeat(27);w_Dict["nonillion"]="0".repeat(30);w_Dict["decillion"]="0".repeat(33);w_Dict["undecillion"]="0".repeat(36);w_Dict["duodecillion"]="0".repeat(39);w_Dict["tredecillion"]="0".repeat(42);w_Dict["quattuordecillion"]="0".repeat(45);w_Dict["quindecillion"]="0".repeat(48);w_Dict["sexdecillion"]="0".repeat(51);w_Dict["septendecillion"]="0".repeat(54);w_Dict["octadecillion"]="0".repeat(57);w_Dict["novemdecillion"]="0".repeat(60);w_Dict["vigintillion"]="0".repeat(63);w_Dict["unvigintillion"]="0".repeat(66);w_Dict["duovigintillion"]="0".repeat(69);w_Dict["trevigintillion"]="0".repeat(72);w_Dict["quattuorvigintillion"]="0".repeat(75);w_Dict["quinvigintillion"]="0".repeat(78);w_Dict["sexvigintillion"]="0".repeat(81);w_Dict["septenvigintillion"]="0".repeat(84);w_Dict["octavigintillion"]="0".repeat(87);w_Dict["novemvigintillion"]="0".repeat(90);w_Dict["trigintillion"]="0".repeat(93);w_Dict["untrigintillion"]="0".repeat(96);w_Dict["duotrigintillion"]="0".repeat(99);w_Dict["tretrigintillion"]="0".repeat(102);w_Dict["quattuortrigintillion"]="0".repeat(105);w_Dict["quintrigintillion"]="0".repeat(108);w_Dict["sextrigintillion"]="0".repeat(111);w_Dict["septentrigintillion"]="0".repeat(114);w_Dict["octotrigintillion"]="0".repeat(117);w_Dict["novemtrigintillion"]="0".repeat(120);w_Dict["quadragintillion"]="0".repeat(123);w_Dict["unquadragintillion"]="0".repeat(126);w_Dict["duoquadragintillion"]="0".repeat(129);w_Dict["trequadragintillion"]="0".repeat(132);w_Dict["quattuorquadragintillion"]="0".repeat(135);w_Dict["quinquadragintillion"]="0".repeat(138);w_Dict["sexquadragintillion"]="0".repeat(141);w_Dict["septenquadragintillion"]="0".repeat(144);w_Dict["octaquadragintillion"]="0".repeat(147);w_Dict["novemquadragintillion"]="0".repeat(150);w_Dict["quinquagintillion"]="0".repeat(153);w_Dict["unquinquagintillion"]="0".repeat(156);w_Dict["duoquinquagintillion"]="0".repeat(159);w_Dict["trequinquagintillion"]="0".repeat(162);w_Dict["quattuorquinquagintillion"]="0".repeat(165);w_Dict["quinquinquagintillion"]="0".repeat(168);w_Dict["sexquinquagintillion"]="0".repeat(171);w_Dict["septenquinquagintillion"]="0".repeat(174);w_Dict["octaquinquagintillion"]="0".repeat(177);w_Dict["novemquinquagintillion"]="0".repeat(180);w_Dict["sexagintillion"]="0".repeat(183);w_Dict["unsexagintillion"]="0".repeat(186);w_Dict["duosexagintillion"]="0".repeat(189);w_Dict["tresexagintillion"]="0".repeat(192);w_Dict["quattuorsexagintillion"]="0".repeat(195);w_Dict["quinsexagintillion"]="0".repeat(198);w_Dict["sexsexagintillion"]="0".repeat(201);w_Dict["septensexagintillion"]="0".repeat(204);w_Dict["octasexagintillion"]="0".repeat(207);w_Dict["novemsexagintillion"]="0".repeat(210);w_Dict["septuagintillion"]="0".repeat(213);w_Dict["unseptuagintillion"]="0".repeat(216);w_Dict["duoseptuagintillion"]="0".repeat(219);w_Dict["treseptuagintillion"]="0".repeat(222);w_Dict["quattuorseptuagintillion"]="0".repeat(225);w_Dict["quinseptuagintillion"]="0".repeat(228);w_Dict["sexseptuagintillion"]="0".repeat(231);w_Dict["septenseptuagintillion"]="0".repeat(234);w_Dict["octaseptuagintillion"]="0".repeat(237);w_Dict["novemseptuagintillion"]="0".repeat(240);w_Dict["octagintillion"]="0".repeat(243);w_Dict["unoctogintillion"]="0".repeat(246);w_Dict["duooctogintillion"]="0".repeat(249);w_Dict["treoctogintillion"]="0".repeat(252);w_Dict["quattuoroctogintillion"]="0".repeat(255);w_Dict["quinoctogintillion"]="0".repeat(258);w_Dict["sexoctogintillion"]="0".repeat(261);w_Dict["septenoctogintillion"]="0".repeat(264);w_Dict["octaoctogintillion"]="0".repeat(267);w_Dict["novemoctogintillion"]="0".repeat(270);w_Dict["nonagintillion"]="0".repeat(273);w_Dict["unnonagintillion"]="0".repeat(276);w_Dict["duononagintillion"]="0".repeat(279);w_Dict["trenonagintillion"]="0".repeat(282);w_Dict["quattuornonagintillion"]="0".repeat(285);w_Dict["quinnonagintillion"]="0".repeat(288);w_Dict["sexnonagintillion"]="0".repeat(291);w_Dict["septennonagintillion"]="0".repeat(294);w_Dict["octanonagintillion"]="0".repeat(297);w_Dict["novemnonagintillion"]="0".repeat(300);w_Dict["centillion"]="0".repeat(303);w_Dict["cenuntillion"]="0".repeat(306);w_Dict["cendotillion"]="0".repeat(309);w_Dict["centretillion"]="0".repeat(312);w_Dict["cenquattuortillion"]="0".repeat(315);w_Dict["cenquintillion"]="0".repeat(318);w_Dict["censextillion"]="0".repeat(321);w_Dict["censeptentillion"]="0".repeat(324);w_Dict["cenoctotillion"]="0".repeat(327);w_Dict["cennovemtillion"]="0".repeat(330);w_Dict["cendecillion"]="0".repeat(333);w_Dict["cenundecillion"]="0".repeat(336);w_Dict["cendodecillion"]="0".repeat(339);w_Dict["centredecillion"]="0".repeat(342);w_Dict["cenquattuordecillion"]="0".repeat(345);w_Dict["cenquindecillion"]="0".repeat(348);w_Dict["censexdecillion"]="0".repeat(351);w_Dict["censeptendecillion"]="0".repeat(354);w_Dict["cenoctodecillion"]="0".repeat(357);w_Dict["cennovemdecillion"]="0".repeat(360);w_Dict["cenvigintillion"]="0".repeat(363);w_Dict["cenunvigintillion"]="0".repeat(366);w_Dict["cendovigintillion"]="0".repeat(369);w_Dict["centrevigintillion"]="0".repeat(372);w_Dict["cenquattuorvigintillion"]="0".repeat(375);w_Dict["cenquinvigintillion"]="0".repeat(378);w_Dict["censexvigintillion"]="0".repeat(381);w_Dict["censeptenvigintillion"]="0".repeat(384);w_Dict["cenoctovigintillion"]="0".repeat(387);w_Dict["cennovemvigintillion"]="0".repeat(390);w_Dict["centrigintillion"]="0".repeat(393);w_Dict["cenuntrigintillion"]="0".repeat(396);w_Dict["cendotrigintillion"]="0".repeat(399);w_Dict["centretrigintillion"]="0".repeat(402);w_Dict["cenquattuortrigintillion"]="0".repeat(405);w_Dict["cenquintrigintillion"]="0".repeat(408);w_Dict["censextrigintillion"]="0".repeat(411);w_Dict["censeptentrigintillion"]="0".repeat(414);w_Dict["cenoctotrigintillion"]="0".repeat(417);w_Dict["cennovemtrigintillion"]="0".repeat(420);w_Dict["cenquadragintillion"]="0".repeat(423);w_Dict["cenunquadragintillion"]="0".repeat(426);w_Dict["cendoquadragintillion"]="0".repeat(429);w_Dict["centrequadragintillion"]="0".repeat(432);w_Dict["cenquattuorquadragintillion"]="0".repeat(435);w_Dict["cenquinquadragintillion"]="0".repeat(438);w_Dict["censexquadragintillion"]="0".repeat(441);w_Dict["censeptenquadragintillion"]="0".repeat(444);w_Dict["cenoctoquadragintillion"]="0".repeat(447);w_Dict["cennovemquadragintillion"]="0".repeat(450);w_Dict["cenquinquagintillion"]="0".repeat(453);w_Dict["cenunquinquagintillion"]="0".repeat(456);w_Dict["cendoquinquagintillion"]="0".repeat(459);w_Dict["centrequinquagintillion"]="0".repeat(462);w_Dict["cenquattuorquinquagintillion"]="0".repeat(465);w_Dict["cenquinquinquagintillion"]="0".repeat(468);w_Dict["censexquinquagintillion"]="0".repeat(471);w_Dict["censeptenquinquagintillion"]="0".repeat(474);w_Dict["cenoctoquinquagintillion"]="0".repeat(477);w_Dict["cennovemquinquagintillion"]="0".repeat(480);w_Dict["censexagintillion"]="0".repeat(483);w_Dict["cenunsexagintillion"]="0".repeat(486);w_Dict["cendosexagintillion"]="0".repeat(489);w_Dict["centresexagintillion"]="0".repeat(492);w_Dict["cenquattuorsexagintillion"]="0".repeat(495);w_Dict["cenquinsexagintillion"]="0".repeat(498);w_Dict["censexsexagintillion"]="0".repeat(501);w_Dict["censeptensexagintillion"]="0".repeat(504);w_Dict["cenoctosexagintillion"]="0".repeat(507);w_Dict["cennovemsexagintillion"]="0".repeat(510);w_Dict["censeptuagintillion"]="0".repeat(513);w_Dict["cenunseptuagintillion"]="0".repeat(516);w_Dict["cendoseptuagintillion"]="0".repeat(519);w_Dict["centreseptuagintillion"]="0".repeat(522);w_Dict["cenquattuorseptuagintillion"]="0".repeat(525);w_Dict["cenquinseptuagintillion"]="0".repeat(528);w_Dict["censexseptuagintillion"]="0".repeat(531);w_Dict["censeptenseptuagintillion"]="0".repeat(534);w_Dict["cenoctoseptuagintillion"]="0".repeat(537);w_Dict["cennovemseptuagintillion"]="0".repeat(540);w_Dict["cenoctogintillion"]="0".repeat(543);w_Dict["cenunoctogintillion"]="0".repeat(546);w_Dict["cendooctogintillion"]="0".repeat(549);w_Dict["centreoctogintillion"]="0".repeat(552);w_Dict["cenquattuoroctogintillion"]="0".repeat(555);w_Dict["cenquinoctogintillion"]="0".repeat(558);w_Dict["censexoctogintillion"]="0".repeat(561);w_Dict["censeptenoctogintillion"]="0".repeat(564);w_Dict["cenoctooctogintillion"]="0".repeat(567);w_Dict["cennovemoctogintillion"]="0".repeat(570);w_Dict["cennonagintillion"]="0".repeat(573);w_Dict["cenunnonagintillion"]="0".repeat(576);w_Dict["cendononagintillion"]="0".repeat(579);w_Dict["centrenonagintillion"]="0".repeat(582);w_Dict["cenquattuornonagintillion"]="0".repeat(585);w_Dict["cenquinnonagintillion"]="0".repeat(588);w_Dict["censexnonagintillion"]="0".repeat(591);w_Dict["censeptennonagintillion"]="0".repeat(594);w_Dict["cenoctononagintillion"]="0".repeat(597);w_Dict["cennovemnonagintillion"]="0".repeat(600);w_Dict["duocentillion"]="0".repeat(603);w_Dict["duocenuntillion"]="0".repeat(606);w_Dict["duocendotillion"]="0".repeat(609);w_Dict["duocentretillion"]="0".repeat(612);w_Dict["duocenquattuortillion"]="0".repeat(615);w_Dict["duocenquintillion"]="0".repeat(618);w_Dict["duocensextillion"]="0".repeat(621);w_Dict["duocenseptentillion"]="0".repeat(624);w_Dict["duocenoctotillion"]="0".repeat(627);w_Dict["duocennovemtillion"]="0".repeat(630);w_Dict["duocendecillion"]="0".repeat(633);w_Dict["duocenundecillion"]="0".repeat(636);w_Dict["duocendodecillion"]="0".repeat(639);w_Dict["duocentredecillion"]="0".repeat(642);w_Dict["duocenquattuordecillion"]="0".repeat(645);w_Dict["duocenquindecillion"]="0".repeat(648);w_Dict["duocensexdecillion"]="0".repeat(651);w_Dict["duocenseptendecillion"]="0".repeat(654);w_Dict["duocenoctodecillion"]="0".repeat(657);w_Dict["duocennovemdecillion"]="0".repeat(660);w_Dict["duocenvigintillion"]="0".repeat(663);w_Dict["duocenunvigintillion"]="0".repeat(666);w_Dict["duocendovigintillion"]="0".repeat(669);w_Dict["duocentrevigintillion"]="0".repeat(672);w_Dict["duocenquattuorvigintillion"]="0".repeat(675);w_Dict["duocenquinvigintillion"]="0".repeat(678);w_Dict["duocensexvigintillion"]="0".repeat(681);w_Dict["duocenseptenvigintillion"]="0".repeat(684);w_Dict["duocenoctovigintillion"]="0".repeat(687);w_Dict["duocennovemvigintillion"]="0".repeat(690);w_Dict["duocentrigintillion"]="0".repeat(693);w_Dict["duocenuntrigintillion"]="0".repeat(696);w_Dict["duocendotrigintillion"]="0".repeat(699);w_Dict["duocentretrigintillion"]="0".repeat(702);w_Dict["duocenquattuortrigintillion"]="0".repeat(705);w_Dict["duocenquintrigintillion"]="0".repeat(708);w_Dict["duocensextrigintillion"]="0".repeat(711);w_Dict["duocenseptentrigintillion"]="0".repeat(714);w_Dict["duocenoctotrigintillion"]="0".repeat(717);w_Dict["duocennovemtrigintillion"]="0".repeat(720);w_Dict["duocenquadragintillion"]="0".repeat(723);w_Dict["duocenunquadragintillion"]="0".repeat(726);w_Dict["duocendoquadragintillion"]="0".repeat(729);w_Dict["duocentrequadragintillion"]="0".repeat(732);w_Dict["duocenquattuorquadragintillion"]="0".repeat(735);w_Dict["duocenquinquadragintillion"]="0".repeat(738);w_Dict["duocensexquadragintillion"]="0".repeat(741);w_Dict["duocenseptenquadragintillion"]="0".repeat(744);w_Dict["duocenoctoquadragintillion"]="0".repeat(747);w_Dict["duocennovemquadragintillion"]="0".repeat(750);w_Dict["duocenquinquagintillion"]="0".repeat(753);w_Dict["duocenunquinquagintillion"]="0".repeat(756);w_Dict["duocendoquinquagintillion"]="0".repeat(759);w_Dict["duocentrequinquagintillion"]="0".repeat(762);w_Dict["duocenquattuorquinquagintillion"]="0".repeat(765);w_Dict["duocenquinquinquagintillion"]="0".repeat(768);w_Dict["duocensexquinquagintillion"]="0".repeat(771);w_Dict["duocenseptenquinquagintillion"]="0".repeat(774);w_Dict["duocenoctoquinquagintillion"]="0".repeat(777);w_Dict["duocennovemquinquagintillion"]="0".repeat(780);w_Dict["duocensexagintillion"]="0".repeat(783);w_Dict["duocenunsexagintillion"]="0".repeat(786);w_Dict["duocendosexagintillion"]="0".repeat(789);w_Dict["duocentresexagintillion"]="0".repeat(792);w_Dict["duocenquattuorsexagintillion"]="0".repeat(795);w_Dict["duocenquinsexagintillion"]="0".repeat(798);w_Dict["duocensexsexagintillion"]="0".repeat(801);w_Dict["duocenseptensexagintillion"]="0".repeat(804);w_Dict["duocenoctosexagintillion"]="0".repeat(807);w_Dict["duocennovemsexagintillion"]="0".repeat(810);w_Dict["duocenseptuagintillion"]="0".repeat(813);w_Dict["duocenunseptuagintillion"]="0".repeat(816);w_Dict["duocendoseptuagintillion"]="0".repeat(819);w_Dict["duocentreseptuagintillion"]="0".repeat(822);w_Dict["duocenquattuorseptuagintillion"]="0".repeat(825);w_Dict["duocenquinseptuagintillion"]="0".repeat(828);w_Dict["duocensexseptuagintillion"]="0".repeat(831);w_Dict["duocenseptenseptuagintillion"]="0".repeat(834);w_Dict["duocenoctoseptuagintillion"]="0".repeat(837);w_Dict["duocennovemseptuagintillion"]="0".repeat(840);w_Dict["duocenoctogintillion"]="0".repeat(843);w_Dict["duocenunoctogintillion"]="0".repeat(846);w_Dict["duocendooctogintillion"]="0".repeat(849);w_Dict["duocentreoctogintillion"]="0".repeat(852);w_Dict["duocenquattuoroctogintillion"]="0".repeat(855);w_Dict["duocenquinoctogintillion"]="0".repeat(858);w_Dict["duocensexoctogintillion"]="0".repeat(861);w_Dict["duocenseptenoctogintillion"]="0".repeat(864);w_Dict["duocenoctooctogintillion"]="0".repeat(867);w_Dict["duocennovemoctogintillion"]="0".repeat(870);w_Dict["duocennonagintillion"]="0".repeat(873);w_Dict["duocenunnonagintillion"]="0".repeat(876);w_Dict["duocendononagintillion"]="0".repeat(879);w_Dict["duocentrenonagintillion"]="0".repeat(882);w_Dict["duocenquattuornonagintillion"]="0".repeat(885);w_Dict["duocenquinnonagintillion"]="0".repeat(888);w_Dict["duocensexnonagintillion"]="0".repeat(891);w_Dict["duocenseptennonagintillion"]="0".repeat(894);w_Dict["duocenoctononagintillion"]="0".repeat(897);w_Dict["duocennovemnonagintillion"]="0".repeat(900);w_Dict["trecentillion"]="0".repeat(903);w_Dict["trecenuntillion"]="0".repeat(906);w_Dict["trecendotillion"]="0".repeat(909);w_Dict["trecentretillion"]="0".repeat(912);w_Dict["trecenquattuortillion"]="0".repeat(915);w_Dict["trecenquintillion"]="0".repeat(918);w_Dict["trecensextillion"]="0".repeat(921);w_Dict["trecenseptentillion"]="0".repeat(924);w_Dict["trecenoctotillion"]="0".repeat(927);w_Dict["trecennovemtillion"]="0".repeat(930);w_Dict["trecendecillion"]="0".repeat(933);w_Dict["trecenundecillion"]="0".repeat(936);w_Dict["trecendodecillion"]="0".repeat(939);w_Dict["trecentredecillion"]="0".repeat(942);w_Dict["trecenquattuordecillion"]="0".repeat(945);w_Dict["trecenquindecillion"]="0".repeat(948);w_Dict["trecensexdecillion"]="0".repeat(951);w_Dict["trecenseptendecillion"]="0".repeat(954);w_Dict["trecenoctodecillion"]="0".repeat(957);w_Dict["trecennovemdecillion"]="0".repeat(960);w_Dict["trecenvigintillion"]="0".repeat(963);w_Dict["trecenunvigintillion"]="0".repeat(966);w_Dict["trecendovigintillion"]="0".repeat(969);w_Dict["trecentrevigintillion"]="0".repeat(972);w_Dict["trecenquattuorvigintillion"]="0".repeat(975);w_Dict["trecenquinvigintillion"]="0".repeat(978);w_Dict["trecensexvigintillion"]="0".repeat(981);w_Dict["trecenseptenvigintillion"]="0".repeat(984);w_Dict["trecenoctovigintillion"]="0".repeat(987);w_Dict["trecennovemvigintillion"]="0".repeat(990);w_Dict["trecentrigintillion"]="0".repeat(993);w_Dict["trecenuntrigintillion"]="0".repeat(996);w_Dict["trecendotrigintillion"]="0".repeat(999);w_Dict["trecentretrigintillion"]="0".repeat(1002);
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
	w_Dict["0".repeat(3)] = "thousand"; w_Dict["0".repeat(6)]="million";w_Dict["0".repeat(9)]="billion";w_Dict["0".repeat(12)]="trillion";w_Dict["0".repeat(15)]="quadrillion";w_Dict["0".repeat(18)]="quintillion";w_Dict["0".repeat(21)]="sextillion";w_Dict["0".repeat(24)]="septillion";w_Dict["0".repeat(27)]="octillion";w_Dict["0".repeat(30)]="nonillion";w_Dict["0".repeat(33)]="decillion";w_Dict["0".repeat(36)]="undecillion";w_Dict["0".repeat(39)]="duodecillion";w_Dict["0".repeat(42)]="tredecillion";w_Dict["0".repeat(45)]="quattuordecillion";w_Dict["0".repeat(48)]="quindecillion";w_Dict["0".repeat(51)]="sexdecillion";w_Dict["0".repeat(54)]="septendecillion";w_Dict["0".repeat(57)]="octadecillion";w_Dict["0".repeat(60)]="novemdecillion";w_Dict["0".repeat(63)]="vigintillion";w_Dict["0".repeat(66)]="unvigintillion";w_Dict["0".repeat(69)]="duovigintillion";w_Dict["0".repeat(72)]="trevigintillion";w_Dict["0".repeat(75)]="quattuorvigintillion";w_Dict["0".repeat(78)]="quinvigintillion";w_Dict["0".repeat(81)]="sexvigintillion";w_Dict["0".repeat(84)]="septenvigintillion";w_Dict["0".repeat(87)]="octavigintillion";w_Dict["0".repeat(90)]="novemvigintillion";w_Dict["0".repeat(93)]="trigintillion";w_Dict["0".repeat(96)]="untrigintillion";w_Dict["0".repeat(99)]="duotrigintillion";w_Dict["0".repeat(102)]="tretrigintillion";w_Dict["0".repeat(105)]="quattuortrigintillion";w_Dict["0".repeat(108)]="quintrigintillion";w_Dict["0".repeat(111)]="sextrigintillion";w_Dict["0".repeat(114)]="septentrigintillion";w_Dict["0".repeat(117)]="octotrigintillion";w_Dict["0".repeat(120)]="novemtrigintillion";w_Dict["0".repeat(123)]="quadragintillion";w_Dict["0".repeat(126)]="unquadragintillion";w_Dict["0".repeat(129)]="duoquadragintillion";w_Dict["0".repeat(132)]="trequadragintillion";w_Dict["0".repeat(135)]="quattuorquadragintillion";w_Dict["0".repeat(138)]="quinquadragintillion";w_Dict["0".repeat(141)]="sexquadragintillion";w_Dict["0".repeat(144)]="septenquadragintillion";w_Dict["0".repeat(147)]="octaquadragintillion";w_Dict["0".repeat(150)]="novemquadragintillion";w_Dict["0".repeat(153)]="quinquagintillion";w_Dict["0".repeat(156)]="unquinquagintillion";w_Dict["0".repeat(159)]="duoquinquagintillion";w_Dict["0".repeat(162)]="trequinquagintillion";w_Dict["0".repeat(165)]="quattuorquinquagintillion";w_Dict["0".repeat(168)]="quinquinquagintillion";w_Dict["0".repeat(171)]="sexquinquagintillion";w_Dict["0".repeat(174)]="septenquinquagintillion";w_Dict["0".repeat(177)]="octaquinquagintillion";w_Dict["0".repeat(180)]="novemquinquagintillion";w_Dict["0".repeat(183)]="sexagintillion";w_Dict["0".repeat(186)]="unsexagintillion";w_Dict["0".repeat(189)]="duosexagintillion";w_Dict["0".repeat(192)]="tresexagintillion";w_Dict["0".repeat(195)]="quattuorsexagintillion";w_Dict["0".repeat(198)]="quinsexagintillion";w_Dict["0".repeat(201)]="sexsexagintillion";w_Dict["0".repeat(204)]="septensexagintillion";w_Dict["0".repeat(207)]="octasexagintillion";w_Dict["0".repeat(210)]="novemsexagintillion";w_Dict["0".repeat(213)]="septuagintillion";w_Dict["0".repeat(216)]="unseptuagintillion";w_Dict["0".repeat(219)]="duoseptuagintillion";w_Dict["0".repeat(222)]="treseptuagintillion";w_Dict["0".repeat(225)]="quattuorseptuagintillion";w_Dict["0".repeat(228)]="quinseptuagintillion";w_Dict["0".repeat(231)]="sexseptuagintillion";w_Dict["0".repeat(234)]="septenseptuagintillion";w_Dict["0".repeat(237)]="octaseptuagintillion";w_Dict["0".repeat(240)]="novemseptuagintillion";w_Dict["0".repeat(243)]="octagintillion";w_Dict["0".repeat(246)]="unoctogintillion";w_Dict["0".repeat(249)]="duooctogintillion";w_Dict["0".repeat(252)]="treoctogintillion";w_Dict["0".repeat(255)]="quattuoroctogintillion";w_Dict["0".repeat(258)]="quinoctogintillion";w_Dict["0".repeat(261)]="sexoctogintillion";w_Dict["0".repeat(264)]="septenoctogintillion";w_Dict["0".repeat(267)]="octaoctogintillion";w_Dict["0".repeat(270)]="novemoctogintillion";w_Dict["0".repeat(273)]="nonagintillion";w_Dict["0".repeat(276)]="unnonagintillion";w_Dict["0".repeat(279)]="duononagintillion";w_Dict["0".repeat(282)]="trenonagintillion";w_Dict["0".repeat(285)]="quattuornonagintillion";w_Dict["0".repeat(288)]="quinnonagintillion";w_Dict["0".repeat(291)]="sexnonagintillion";w_Dict["0".repeat(294)]="septennonagintillion";w_Dict["0".repeat(297)]="octanonagintillion";w_Dict["0".repeat(300)]="novemnonagintillion";w_Dict["0".repeat(303)]="centillion";w_Dict["0".repeat(306)]="cenuntillion";w_Dict["0".repeat(309)]="cendotillion";w_Dict["0".repeat(312)]="centretillion";w_Dict["0".repeat(315)]="cenquattuortillion";w_Dict["0".repeat(318)]="cenquintillion";w_Dict["0".repeat(321)]="censextillion";w_Dict["0".repeat(324)]="censeptentillion";w_Dict["0".repeat(327)]="cenoctotillion";w_Dict["0".repeat(330)]="cennovemtillion";w_Dict["0".repeat(333)]="cendecillion";w_Dict["0".repeat(336)]="cenundecillion";w_Dict["0".repeat(339)]="cendodecillion";w_Dict["0".repeat(342)]="centredecillion";w_Dict["0".repeat(345)]="cenquattuordecillion";w_Dict["0".repeat(348)]="cenquindecillion";w_Dict["0".repeat(351)]="censexdecillion";w_Dict["0".repeat(354)]="censeptendecillion";w_Dict["0".repeat(357)]="cenoctodecillion";w_Dict["0".repeat(360)]="cennovemdecillion";w_Dict["0".repeat(363)]="cenvigintillion";w_Dict["0".repeat(366)]="cenunvigintillion";w_Dict["0".repeat(369)]="cendovigintillion";w_Dict["0".repeat(372)]="centrevigintillion";w_Dict["0".repeat(375)]="cenquattuorvigintillion";w_Dict["0".repeat(378)]="cenquinvigintillion";w_Dict["0".repeat(381)]="censexvigintillion";w_Dict["0".repeat(384)]="censeptenvigintillion";w_Dict["0".repeat(387)]="cenoctovigintillion";w_Dict["0".repeat(390)]="cennovemvigintillion";w_Dict["0".repeat(393)]="centrigintillion";w_Dict["0".repeat(396)]="cenuntrigintillion";w_Dict["0".repeat(399)]="cendotrigintillion";w_Dict["0".repeat(402)]="centretrigintillion";w_Dict["0".repeat(405)]="cenquattuortrigintillion";w_Dict["0".repeat(408)]="cenquintrigintillion";w_Dict["0".repeat(411)]="censextrigintillion";w_Dict["0".repeat(414)]="censeptentrigintillion";w_Dict["0".repeat(417)]="cenoctotrigintillion";w_Dict["0".repeat(420)]="cennovemtrigintillion";w_Dict["0".repeat(423)]="cenquadragintillion";w_Dict["0".repeat(426)]="cenunquadragintillion";w_Dict["0".repeat(429)]="cendoquadragintillion";w_Dict["0".repeat(432)]="centrequadragintillion";w_Dict["0".repeat(435)]="cenquattuorquadragintillion";w_Dict["0".repeat(438)]="cenquinquadragintillion";w_Dict["0".repeat(441)]="censexquadragintillion";w_Dict["0".repeat(444)]="censeptenquadragintillion";w_Dict["0".repeat(447)]="cenoctoquadragintillion";w_Dict["0".repeat(450)]="cennovemquadragintillion";w_Dict["0".repeat(453)]="cenquinquagintillion";w_Dict["0".repeat(456)]="cenunquinquagintillion";w_Dict["0".repeat(459)]="cendoquinquagintillion";w_Dict["0".repeat(462)]="centrequinquagintillion";w_Dict["0".repeat(465)]="cenquattuorquinquagintillion";w_Dict["0".repeat(468)]="cenquinquinquagintillion";w_Dict["0".repeat(471)]="censexquinquagintillion";w_Dict["0".repeat(474)]="censeptenquinquagintillion";w_Dict["0".repeat(477)]="cenoctoquinquagintillion";w_Dict["0".repeat(480)]="cennovemquinquagintillion";w_Dict["0".repeat(483)]="censexagintillion";w_Dict["0".repeat(486)]="cenunsexagintillion";w_Dict["0".repeat(489)]="cendosexagintillion";w_Dict["0".repeat(492)]="centresexagintillion";w_Dict["0".repeat(495)]="cenquattuorsexagintillion";w_Dict["0".repeat(498)]="cenquinsexagintillion";w_Dict["0".repeat(501)]="censexsexagintillion";w_Dict["0".repeat(504)]="censeptensexagintillion";w_Dict["0".repeat(507)]="cenoctosexagintillion";w_Dict["0".repeat(510)]="cennovemsexagintillion";w_Dict["0".repeat(513)]="censeptuagintillion";w_Dict["0".repeat(516)]="cenunseptuagintillion";w_Dict["0".repeat(519)]="cendoseptuagintillion";w_Dict["0".repeat(522)]="centreseptuagintillion";w_Dict["0".repeat(525)]="cenquattuorseptuagintillion";w_Dict["0".repeat(528)]="cenquinseptuagintillion";w_Dict["0".repeat(531)]="censexseptuagintillion";w_Dict["0".repeat(534)]="censeptenseptuagintillion";w_Dict["0".repeat(537)]="cenoctoseptuagintillion";w_Dict["0".repeat(540)]="cennovemseptuagintillion";w_Dict["0".repeat(543)]="cenoctogintillion";w_Dict["0".repeat(546)]="cenunoctogintillion";w_Dict["0".repeat(549)]="cendooctogintillion";w_Dict["0".repeat(552)]="centreoctogintillion";w_Dict["0".repeat(555)]="cenquattuoroctogintillion";w_Dict["0".repeat(558)]="cenquinoctogintillion";w_Dict["0".repeat(561)]="censexoctogintillion";w_Dict["0".repeat(564)]="censeptenoctogintillion";w_Dict["0".repeat(567)]="cenoctooctogintillion";w_Dict["0".repeat(570)]="cennovemoctogintillion";w_Dict["0".repeat(573)]="cennonagintillion";w_Dict["0".repeat(576)]="cenunnonagintillion";w_Dict["0".repeat(579)]="cendononagintillion";w_Dict["0".repeat(582)]="centrenonagintillion";w_Dict["0".repeat(585)]="cenquattuornonagintillion";w_Dict["0".repeat(588)]="cenquinnonagintillion";w_Dict["0".repeat(591)]="censexnonagintillion";w_Dict["0".repeat(594)]="censeptennonagintillion";w_Dict["0".repeat(597)]="cenoctononagintillion";w_Dict["0".repeat(600)]="cennovemnonagintillion";w_Dict["0".repeat(603)]="duocentillion";w_Dict["0".repeat(606)]="duocenuntillion";w_Dict["0".repeat(609)]="duocendotillion";w_Dict["0".repeat(612)]="duocentretillion";w_Dict["0".repeat(615)]="duocenquattuortillion";w_Dict["0".repeat(618)]="duocenquintillion";w_Dict["0".repeat(621)]="duocensextillion";w_Dict["0".repeat(624)]="duocenseptentillion";w_Dict["0".repeat(627)]="duocenoctotillion";w_Dict["0".repeat(630)]="duocennovemtillion";w_Dict["0".repeat(633)]="duocendecillion";w_Dict["0".repeat(636)]="duocenundecillion";w_Dict["0".repeat(639)]="duocendodecillion";w_Dict["0".repeat(642)]="duocentredecillion";w_Dict["0".repeat(645)]="duocenquattuordecillion";w_Dict["0".repeat(648)]="duocenquindecillion";w_Dict["0".repeat(651)]="duocensexdecillion";w_Dict["0".repeat(654)]="duocenseptendecillion";w_Dict["0".repeat(657)]="duocenoctodecillion";w_Dict["0".repeat(660)]="duocennovemdecillion";w_Dict["0".repeat(663)]="duocenvigintillion";w_Dict["0".repeat(666)]="duocenunvigintillion";w_Dict["0".repeat(669)]="duocendovigintillion";w_Dict["0".repeat(672)]="duocentrevigintillion";w_Dict["0".repeat(675)]="duocenquattuorvigintillion";w_Dict["0".repeat(678)]="duocenquinvigintillion";w_Dict["0".repeat(681)]="duocensexvigintillion";w_Dict["0".repeat(684)]="duocenseptenvigintillion";w_Dict["0".repeat(687)]="duocenoctovigintillion";w_Dict["0".repeat(690)]="duocennovemvigintillion";w_Dict["0".repeat(693)]="duocentrigintillion";w_Dict["0".repeat(696)]="duocenuntrigintillion";w_Dict["0".repeat(699)]="duocendotrigintillion";w_Dict["0".repeat(702)]="duocentretrigintillion";w_Dict["0".repeat(705)]="duocenquattuortrigintillion";w_Dict["0".repeat(708)]="duocenquintrigintillion";w_Dict["0".repeat(711)]="duocensextrigintillion";w_Dict["0".repeat(714)]="duocenseptentrigintillion";w_Dict["0".repeat(717)]="duocenoctotrigintillion";w_Dict["0".repeat(720)]="duocennovemtrigintillion";w_Dict["0".repeat(723)]="duocenquadragintillion";w_Dict["0".repeat(726)]="duocenunquadragintillion";w_Dict["0".repeat(729)]="duocendoquadragintillion";w_Dict["0".repeat(732)]="duocentrequadragintillion";w_Dict["0".repeat(735)]="duocenquattuorquadragintillion";w_Dict["0".repeat(738)]="duocenquinquadragintillion";w_Dict["0".repeat(741)]="duocensexquadragintillion";w_Dict["0".repeat(744)]="duocenseptenquadragintillion";w_Dict["0".repeat(747)]="duocenoctoquadragintillion";w_Dict["0".repeat(750)]="duocennovemquadragintillion";w_Dict["0".repeat(753)]="duocenquinquagintillion";w_Dict["0".repeat(756)]="duocenunquinquagintillion";w_Dict["0".repeat(759)]="duocendoquinquagintillion";w_Dict["0".repeat(762)]="duocentrequinquagintillion";w_Dict["0".repeat(765)]="duocenquattuorquinquagintillion";w_Dict["0".repeat(768)]="duocenquinquinquagintillion";w_Dict["0".repeat(771)]="duocensexquinquagintillion";w_Dict["0".repeat(774)]="duocenseptenquinquagintillion";w_Dict["0".repeat(777)]="duocenoctoquinquagintillion";w_Dict["0".repeat(780)]="duocennovemquinquagintillion";w_Dict["0".repeat(783)]="duocensexagintillion";w_Dict["0".repeat(786)]="duocenunsexagintillion";w_Dict["0".repeat(789)]="duocendosexagintillion";w_Dict["0".repeat(792)]="duocentresexagintillion";w_Dict["0".repeat(795)]="duocenquattuorsexagintillion";w_Dict["0".repeat(798)]="duocenquinsexagintillion";w_Dict["0".repeat(801)]="duocensexsexagintillion";w_Dict["0".repeat(804)]="duocenseptensexagintillion";w_Dict["0".repeat(807)]="duocenoctosexagintillion";w_Dict["0".repeat(810)]="duocennovemsexagintillion";w_Dict["0".repeat(813)]="duocenseptuagintillion";w_Dict["0".repeat(816)]="duocenunseptuagintillion";w_Dict["0".repeat(819)]="duocendoseptuagintillion";w_Dict["0".repeat(822)]="duocentreseptuagintillion";w_Dict["0".repeat(825)]="duocenquattuorseptuagintillion";w_Dict["0".repeat(828)]="duocenquinseptuagintillion";w_Dict["0".repeat(831)]="duocensexseptuagintillion";w_Dict["0".repeat(834)]="duocenseptenseptuagintillion";w_Dict["0".repeat(837)]="duocenoctoseptuagintillion";w_Dict["0".repeat(840)]="duocennovemseptuagintillion";w_Dict["0".repeat(843)]="duocenoctogintillion";w_Dict["0".repeat(846)]="duocenunoctogintillion";w_Dict["0".repeat(849)]="duocendooctogintillion";w_Dict["0".repeat(852)]="duocentreoctogintillion";w_Dict["0".repeat(855)]="duocenquattuoroctogintillion";w_Dict["0".repeat(858)]="duocenquinoctogintillion";w_Dict["0".repeat(861)]="duocensexoctogintillion";w_Dict["0".repeat(864)]="duocenseptenoctogintillion";w_Dict["0".repeat(867)]="duocenoctooctogintillion";w_Dict["0".repeat(870)]="duocennovemoctogintillion";w_Dict["0".repeat(873)]="duocennonagintillion";w_Dict["0".repeat(876)]="duocenunnonagintillion";w_Dict["0".repeat(879)]="duocendononagintillion";w_Dict["0".repeat(882)]="duocentrenonagintillion";w_Dict["0".repeat(885)]="duocenquattuornonagintillion";w_Dict["0".repeat(888)]="duocenquinnonagintillion";w_Dict["0".repeat(891)]="duocensexnonagintillion";w_Dict["0".repeat(894)]="duocenseptennonagintillion";w_Dict["0".repeat(897)]="duocenoctononagintillion";w_Dict["0".repeat(900)]="duocennovemnonagintillion";w_Dict["0".repeat(903)]="trecentillion";w_Dict["0".repeat(906)]="trecenuntillion";w_Dict["0".repeat(909)]="trecendotillion";w_Dict["0".repeat(912)]="trecentretillion";w_Dict["0".repeat(915)]="trecenquattuortillion";w_Dict["0".repeat(918)]="trecenquintillion";w_Dict["0".repeat(921)]="trecensextillion";w_Dict["0".repeat(924)]="trecenseptentillion";w_Dict["0".repeat(927)]="trecenoctotillion";w_Dict["0".repeat(930)]="trecennovemtillion";w_Dict["0".repeat(933)]="trecendecillion";w_Dict["0".repeat(936)]="trecenundecillion";w_Dict["0".repeat(939)]="trecendodecillion";w_Dict["0".repeat(942)]="trecentredecillion";w_Dict["0".repeat(945)]="trecenquattuordecillion";w_Dict["0".repeat(948)]="trecenquindecillion";w_Dict["0".repeat(951)]="trecensexdecillion";w_Dict["0".repeat(954)]="trecenseptendecillion";w_Dict["0".repeat(957)]="trecenoctodecillion";w_Dict["0".repeat(960)]="trecennovemdecillion";w_Dict["0".repeat(963)]="trecenvigintillion";w_Dict["0".repeat(966)]="trecenunvigintillion";w_Dict["0".repeat(969)]="trecendovigintillion";w_Dict["0".repeat(972)]="trecentrevigintillion";w_Dict["0".repeat(975)]="trecenquattuorvigintillion";w_Dict["0".repeat(978)]="trecenquinvigintillion";w_Dict["0".repeat(981)]="trecensexvigintillion";w_Dict["0".repeat(984)]="trecenseptenvigintillion";w_Dict["0".repeat(987)]="trecenoctovigintillion";w_Dict["0".repeat(990)]="trecennovemvigintillion";w_Dict["0".repeat(993)]="trecentrigintillion";w_Dict["0".repeat(996)]="trecenuntrigintillion";w_Dict["0".repeat(999)]="trecendotrigintillion";w_Dict["0".repeat(1002)]="trecentretrigintillion";
	return w_Dict[w];
}
if(typeof module != 'undefined')
	module.exports = BigArith;