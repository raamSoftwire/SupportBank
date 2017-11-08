const fs = require('fs'); //file system
const parse = require('csv-parse/lib/sync');
const readlineSync = require('readline-sync');

const Transaction = require('C:\\Work\\Training\\SupportBank\\transactionClass.js');
const Account = require('C:\\Work\\Training\\SupportBank\\accountClass.js');

const formatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    });


dataFile = 'Transactions2014.csv';
const inputArray = fs.readFileSync(dataFile).toString();
const records = parse(inputArray, {columns: true});
transactions = [];

for(let i in records)
{
    transactions[i] = new Transaction(
        records[i]['Date'],
        records[i]['From'],
        records[i]['To'],
        records[i]['Narrative'],
        records[i]['Amount']);
}

accounts = [];

function accountExistsQ(string) {
    check = false;

    for (let i in accounts)
    {
        if(accounts[i].name==string)
            check = true;
    }
    return check;
}

for(let i in transactions)
{
    if(!accountExistsQ(transactions[i].from))
    {
        //if the account does not exist,create the account
        senderAccount = new Account(transactions[i].from,0);
        accounts.push(senderAccount);
    }
    else
    {
        senderAccount = accounts.find(account => account.name == transactions[i].from);
    }

    if(!accountExistsQ(transactions[i].to))
    {
        //if the account does not exist,create the account
        receiverAccount = new Account(transactions[i].to,0);
        accounts.push(receiverAccount);
    }
    else
    {
        receiverAccount = accounts.find(account => account.name == transactions[i].to);
    }

    senderAccount.amount = senderAccount.amount - transactions[i].amount;
    receiverAccount.amount = receiverAccount.amount + transactions[i].amount;
}

const userInput = readlineSync.question('Please enter "List All" or "List [Account]" : ');
const pattern = new RegExp("List ")

if (userInput == 'List All')
{
    for(let i in accounts)
    {
        console.log(accounts[i].name + " : " + formatter.format(accounts[i].amount));
    }
}

else if (pattern.test(userInput))
{
    const name = userInput.slice(5);

    if (accountExistsQ(name))
    {
        //is this name one of the account name?
        //if so show all transactions
        console.log('show all logs here')

        for (let i in transactions)
        {

        }


    }
    else
    {
        console.log(name + ' not found in system.')
    }
}

else
{
    console.log('Please enter "List All" or "List [Account]" : ');
}