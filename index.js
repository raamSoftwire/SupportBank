
var fs = require('fs'); //file system
var array = fs.readFileSync('Transactions2014.csv').toString().split("\n");


// for(i in array) {
//     console.log(array[i]);
// }

console.log(array[1].split(","))