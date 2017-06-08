function assertEqual(actual, expected, message){
    if(actual !== expected){
        message = ((typeof message != "undefined")? message+" ":"") + "Assertion failed. Expected "+((typeof expected == "string")?"\"":"")+ expected +((typeof expected == "string")?"\"":"")+ " instead got "+((typeof actual == "string")?"\"":"")+ actual +((typeof actual == "string")?"\"":"");
        console.error(message);
    }else console.log("%cTest passed. "+((typeof actual == "string")?"\"":"")+ actual +((typeof actual == "string")?"\"":"")+ " === " +((typeof expected == "string")?"\"":"")+ expected +((typeof expected == "string")?"\"":""), "color: green;");
}

function assertDeepEqual(actual, expected, message){
    if(JSON.stringify(actual) !== JSON.stringify(expected)){
        message = ((typeof message != "undefined")? message+" ":"") + "Assertion failed. Expected " + ((typeof expected == "string")?"\"":"") + JSON.stringify(expected) + ((typeof expected == "string")?"\"":"") + " instead got " + ((typeof actual == "string")?"\"":"") + JSON.stringify(actual) +((typeof actual == "string")?"\"":"");
        console.error(message);
    }else console.log("%cTest passed. "+((typeof actual == "string")?"\"":"")+ JSON.stringify(actual) +((typeof actual == "string")?"\"":"")+ " === " +((typeof expected == "string")?"\"":"")+ JSON.stringify(expected) +((typeof expected == "string")?"\"":""), "color: green;");
}