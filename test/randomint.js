console.log("%cTesting for randomInt", "color: blue; font-size: 20pt;");

console.log(BigArith.randomInt("0", 1000)); //Any number between 0 and 1000
console.log(BigArith.randomInt("one", "one million")); //Any number between 1 and 1000000
console.log(BigArith.randomInt("one million", "three trillion")); //Any number between 1000000 and 1000000000000
console.log(BigArith.randomInt(1e3, new BigArith("1000"))); //Will always display 1000

console.log(BigArith.randomInt("1.9","2.1"));
console.log(BigArith.randomInt("9","1"));