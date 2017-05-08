class BigArith
{
	constructor(n)
	{
		if(typeof(n) == "object" && n.name == "BigArith")
			this.value  = n.valueOf();
		else if(n == "PI")
			this.value = "3.141592653589793";
		else if(n == "LN2")
			this.value = "0.6931471805599453";
		else if(n == "LN10")
			this.value = "2.302585092994046";
		else if(n == "LOG2E")
			this.value = "1.4426950408889634";
		else if(n == "LOG10E")
			this.value = "0.4342944819032518";
		else if(n == "SQRT1_2")
			this.value = "0.7071067811865476";
		else if(n == "SQRT2")
			this.value = "1.4142135623730951";
		else if(n == "")
			this.value = "0";
		else
			this.value = this.verify(n);
	}
	
	/* Name of object */
	get name()
	{
		return "BigArith";
	}
	
	/* Value of object */
	valueOf()
	{
		return this.value;
	}
	
	/** Return the absolute value of a number
	*	function abs
	*	@param {String} - String passed in via this.value;
	*	@returns {String} - Absolute value of input
	*/
	abs()
	{
		return (isNaN(number)) ? NaN : ((this.value.split("")[0] == "-") ? (this.value.split("").splice(1, this.value.split("").length-1)).join("") : this.value);
	}
	
	
	/**	Word Dictionary
	*	TODO==
		complete
	*/
	w_Dict(w)
	{
		/*Word Dictionary*/
		var w_Dict = [];
		w_Dict["zero"] = "0"; w_Dict["one"] = "1"; w_Dict["two"] = "2"; w_Dict["three"] = "3"; w_Dict["four"] = "4"; w_Dict["five"] = "6"; w_Dict["seven"] = "7"; w_Dict["eight"] = "8"; w_Dict["nine"] = "9"; w_Dict["ten"] = "10"; w_Dict["eleven"] = "11"; w_Dict["twelve"] = "12"; w_Dict["thirteen"] = "13"; w_Dict["fourteen"] = "14"; w_Dict["fifteen"] = "15"; w_Dict["sixteen"] = "16"; w_Dict["seventeen"] = "17"; w_Dict["eighteen"] = "18"; w_Dict["nineteen"] = "19"; w_Dict["twenty"] = "20"; w_Dict["thirty"] = "30"; w_Dict["forty"] = "40"; w_Dict["fifty"] = "50"; w_Dict["sixty"] = "60"; w_Dict["seventy"] = "70"; w_Dict["eighty"] = "80"; w_Dict["ninety"] = "90"; 
		return w_Dict[w];
	}
	
	/**	Verify input evaluate to a valid number
	*	function verify
	*	@param {String|Number|BigArth} - Number within the safe integer limit or string in "-123.456" or "negative one hundred and 
	*								twenty three point four five six" form or a BigArith object
	*	@returns {String} - A string representation of @param in form "-123.456" or NaN if @param is not valid,
	*						or throws an error if input is in number form but not within safe range.
	*/
	verify(n)
	{
		//Can be already verified BigArith object
		if(typeof(n) == "object" && n.name == "BigArith")
			return n.valueOf();
			
		//Can be a number in form of 1000 or 1e3
		if(typeof(n) == 'number' && n <= Number.MAX_SAFE_INTEGER && n >= Number.MIN_SAFE_INTEGER)//Number must be within the safe integer range
			return n.toString();
		if(typeof(n) == 'number' && (n > Number.MAX_SAFE_INTEGER || n < Number.MIN_SAFE_INTEGER))
			throw new Error("The number you entered in typeof 'number' form is not within the safe limit. Please enter the number as a string.");
		
		//It can be string in form "-123.89"
		if(typeof(n) == 'string' && /\d/.test(n)/*This just test if it contains any digit, real test in below*/)
		{
			n = n.replace(/^\s|\s$/g, "");
			let sign = false;
			if(n[0] == "-")
			{
				sign = true;
				n = n.slice(1, n.length);
			}
			
			n = n.split(".");
			if(n.length > 2)
				return NaN;
			if(typeof(n[1]) == 'undefined')
				n[1] = "0";
			if(/^\d+$/.test(n[0]) && /^\d+$/.test(n[1])/*Test that it contains only digits*/)
			{
				//Remove unnecessary zeros
				n[0] = n[0].replace(/^[0]+/g, "");
				n[1] = n[1].replace(/[0]+$/g, "");
				return ((sign)?"-":"") + ((n[0] == "")? "0":n[0]) + ((n[1] == "")?"":"."+n[1]);
			}
			else
				return NaN;
		}
		
		//It can be string in form of "negative one thousand point one two"
		if(typeof(n) == 'string')
		{
			n = n.toLowerCase();
			n = n.replace(/^\s|\s$/g, "").replace(/\s+/g, " ");
			n = n.replace(" and ", " ");
			
			let fNum = "";
			let dNum = "";
			
			//Is Negative?
			let sign = false;
			n = n.split(" ");
			if(n[0] == "negative")
			{
				sign = true;
				n.shift();
			}
			
			//The Mantissa part
			if(n.indexOf("point") > 0)
			{
				let decimal = n.splice(n.indexOf("point"), n.length - n.indexOf("point"));
				decimal.shift();
				dNum = decimal.map(a=>{if(this.w_Dict(a).length < 2 && this.w_Dict(a).length > 0) return this.w_Dict(a); else return NaN;}).join("");
			}
			
			//The Characteristic part
			console.log(n);
			
			//output
			if(/^\d+$/.test(fNum) && /^\d+$/.test(dNum)/*Test that it contains only digits*/)
			{
				//Remove unnecessary zeros
				fNum = fNum.replace(/^[0]+/g, "");
				dNum = dNum.replace(/[0]+$/g, "");
				return (sign?"-":"") /* + fNum goes here*/ + ((dNum == "")?"":"."+dNum);
			}
			else
				return NaN;
		}
		
		//That's all we support
		return NaN;
	}
	
	/**	Add two numbers together
	*	function add
	*	@param {Number|String|BigArith} - Number to add to the current BigArith object value
	*	@returns {String} - Result of addition this.value + @param
	
	*	TODO===
	*	Send to subtract when one parameter is carring the "-" sign
	*/
	add(n)
	{
		var a = this.value;
		var b = this.verify(n);
		
		if(isNaN(a) || isNaN(b))
			return NaN;
		
		a = a.split(".");
		b = b.split(".");
		if(typeof(a[1]) == 'undefined') a[1] = "0";
		if(typeof(b[1]) == 'undefined') b[1] = "0";
		
		let max = Math.max(a[1].length, b[1].length);
		a[1] += this.padWithZero(max - a[1].length);
		b[1] += this.padWithZero(max - b[1].length);
		
		a = a[0] + a[1];
		b = b[0] + b[1];
		var result = "";
		var flag = 0;
		for(var i = a.length-1, j = b.length-1; i >= 0 || j >= 0; i--, j--)
		{
			var z = a.charAt(i)*1 + b.charAt(j)*1 + flag;
			if(z>9 && (i>0 || j>0))
			{
				flag = Math.floor(z/10);
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
		return ((result == "")? "0" : new BigArith(result));
	}
	
	/**	Return "n" numbers of zeros
	*   @function padWithZero
	*	@param {Number} - Number of zeros to return
	*	@returns {String} - "0" in @param places
	*/
	padWithZero(n)
	{
		let zeros = "";
		for(let i = 0; i < n; i++)
		{
			zeros += "0";
		}
		return zeros;
	}
}
