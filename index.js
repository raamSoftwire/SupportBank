const fs = require('fs'); //file system
const parse = require('csv-parse/lib/sync');
const readlineSync = require('readline-sync');
const log4js = require('log4js');
const moment = require('moment');

const Transaction = require('C:\\Work\\Training\\SupportBank\\transactionClass.js');
const Account = require('C:\\Work\\Training\\SupportBank\\accountClass.js');

const formatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    });

log4js.configure({
    appenders: {file: { type: 'fileSync', filename: 'logs/debug.log' }},
    categories: {default: { appenders: ['file'], level: 'debug'}}
});


// dataFile = 'Transactions2014.csv';
// dataFile = 'DodgyTransactions2015.csv';

dataFile = 'Transactions2013.json';

const logger = log4js.getLogger(dataFile);
logger.debug("Program starting up...")

const inputArray = fs.readFileSync(dataFile).toString();



// const records = parse(inputArray, {columns: true});

const records = JSON.parse(inputArray);

transactions = [];
var keys = Object.keys(records[1]);

for(let i in records)
{
    let lineValue = parseInt(i) + 2;


    if(!moment(records[i]['Date'],["DD/MM/YYYY","YYYY-MM-DD"],'en').isValid())
    {
        logger.error("Invalid date found in line " + lineValue +
            " : " + records[i]['Date']);
    }

    else if (isNaN(parseFloat(records[i]['Amount'])))
    {

        logger.error("Invalid amount found in line " + lineValue
            + " : " + records[i]['Amount'])
    }
    else
    {
        transaction = new Transaction(
            records[i][keys[0]],
            records[i][keys[1]],
            records[i][keys[2]],
            records[i][keys[3]],
            records[i][keys[4]]);

        transactions.push(transaction);
        //transaction not added to list of transactions
    }
}
logger.info("Successfully parsed " + transactions.length + " of " + records.length +
    " transactions");

accounts = [];
function accountExistsQ(string) {
    check = false;

    for (let i in accounts)
    {
        if(accounts[i].name === string)
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
        senderAccount = accounts.find(account => account.name === transactions[i].from);
    }

    if(!accountExistsQ(transactions[i].to))
    {
        //if the account does not exist,create the account
        receiverAccount = new Account(transactions[i].to,0);
        accounts.push(receiverAccount);
    }
    else
    {
        receiverAccount = accounts.find(account => account.name === transactions[i].to);
    }

    senderAccount.amount = senderAccount.amount - transactions[i].amount;
    receiverAccount.amount = receiverAccount.amount + transactions[i].amount;
}

const userInput = readlineSync.question('Please enter "List All" or "List [Account]" : ');
const pattern = new RegExp("List ");

if (userInput === 'List All')
{
    for(let i in accounts)
        console.log(accounts[i].name + " : " + formatter.format(accounts[i].amount));
        logger.debug("User entered 'List All'");
}

else if (pattern.test(userInput))
{
    const name = userInput.slice(5);

    if (accountExistsQ(name))
    {
        logger.debug("User entered 'List " + name + "'");
        tempTransactions = [];
        for (let i in transactions)
        {
            if(transactions[i].from === name || transactions[i].to === name)
                tempTransactions.push(transactions[i]);

        }

        for (let i in tempTransactions)
        {
            if(tempTransactions[i].from === name)
            {
                console.log(
                    tempTransactions[i].date + " " +
                    formatter.format("-" + tempTransactions[i].amount) + " \t" +
                    tempTransactions[i].narrative);
            }
            else if (tempTransactions[i].to === name)
            {
                console.log(
                    tempTransactions[i].date + " " +
                    formatter.format(tempTransactions[i].amount) + " \t" +
                    tempTransactions[i].narrative);
            }
            else
                 logger.error("Unhandled error case");

        }
    }
    else
    {
        console.log(name + ' not found in system.');
        logger.debug("User entered a name that was not in the system : " + name)
    }
}

else
{
    console.log('User did not input "List All" or "List [Account]" : ' + userInput);
    //maybe send this back to the user input step now
    logger.debug("User did not input 'List All' or 'List [Account]' : " + userInput );
}