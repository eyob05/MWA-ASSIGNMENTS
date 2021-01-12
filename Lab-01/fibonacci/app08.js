var child_process= require("child_process");
console.log("1: Start");
var newProcess= child_process.spawn("node",
["computation/fibonacci.js"], {stdio : "inherit"});
console.log("2: End");