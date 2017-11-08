var fs = require('fs'); //file system
var inputArray = fs.readFileSync('Transactions2014.csv').toString();

var parse = require('csv-parse/lib/sync');
records = parse(inputArray, {columns: true});

var Transaction = require('C:\\Work\\Training\\SupportBank\\transactionClass.js');

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

var Account = require('C:\\Work\\Training\\SupportBank\\accountClass.js');

accounts = [];

// for(i in transactions)
// {
//
// }

function accountExistsQ(string) {
    check = false;

    for (i in accounts)
    {
        if(accounts[i].name==string)
        {
            check = true;
        }
    }

    return check;

}

console.log(
accountExistsQ('Raam')
)

// accounts[0]= new Account('Raam',0)
accounts.push(new Account('Raam',0))


console.log(
    accountExistsQ('Raam')
)


