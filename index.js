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
        records[i]['Amount']);
}

var Account = require('C:\\Work\\Training\\SupportBank\\accountClass.js');

accounts = [];

function accountExistsQ(string) {
    check = false;

    for (i in accounts)
    {
        if(accounts[i].name==string)
            check = true;
    }
    return check;
}


for(i in transactions)
{
    if(!accountExistsQ(transactions[i].from))
    {
        //if the account does not exist,create the account
        senderAccount = new Account(transactions[i].from,0);
        accounts.push(senderAccount)
    }

    if(!accountExistsQ(transactions[i].to))
    {
        //if the account does not exist,create the account
        receiverAccount = new Account(transactions[i].to,0);
        accounts.push(receiverAccount)
    }

    //update the balance from this transaction

    // accounts.indexOf(transactions[i].from)

    // transactions[i].amount

}

console.log(accounts.length)


