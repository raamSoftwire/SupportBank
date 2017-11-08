var fs = require('fs'); //file system
var inputArray = fs.readFileSync('Transactions2014.csv').toString();

var parse = require('csv-parse/lib/sync');
records = parse(inputArray, {columns: true});

const Transaction = require('C:\\Work\\Training\\SupportBank\\transactionClass.js');

transactions = [];

for(i in records)
{
    transactions[i] = new Transaction(
        records[i]['Date'],
        records[i]['From'],
        records[i]['To'],
        records[i]['Narrative'],
        records[i]['Amount'])
}

console.log(transactions[0])
