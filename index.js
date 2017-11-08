var fs = require('fs'); //file system
dataFile = 'Transactions2014.csv';
var inputArray = fs.readFileSync(dataFile).toString();

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

    senderAccount.amount = senderAccount.amount - transactions[i].amount;
    receiverAccount.amount = receiverAccount.amount + transactions[i].amount;
}

// for(i in accounts)
// {
//     console.log(accounts[i]);
// }

var formatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
});

var readlineSync = require('readline-sync');

userInput = readlineSync.question('Please enter "List All" or "List[Account]" : ');


if (userInput == 'List All')
{
    for(i in accounts)
    {
        console.log(accounts[i].name + " : " + formatter.format(accounts[i].amount));
    }
}

else if (userInput == 'List ')//need a wildcard search here
{
    //list one person's account
}

else
{
    console.log('Please enter "List All" or "List[Account]" : ');
}