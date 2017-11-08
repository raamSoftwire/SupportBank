var fs = require('fs'); //file system
var inputArray = fs.readFileSync('Transactions2014.csv').toString();

var parse = require('csv-parse/lib/sync');
records = parse(inputArray, {columns: true});

for(i in records)
{
    console.log(records[i]);
}



