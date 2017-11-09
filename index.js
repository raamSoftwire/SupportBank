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
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});


// dataFile = 'Transactions2014.csv';
dataFile = 'DodgyTransactions2015.csv';

const logger = log4js.getLogger(dataFile);
logger.debug("Program starting up...")

const inputArray = fs.readFileSync(dataFile).toString();
const records = parse(inputArray, {columns: true});


transactions = [];
for(let i in records)
{
    let lineValue = parseInt(i) + 2;

    if(!moment(records[i]['Date'],"DD/MM/YYYY",'en',true).isValid())
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
            records[i]['Date'],
            records[i]['From'],
            records[i]['To'],
            records[i]['Narrative'],
            records[i]['Amount']);

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
}

else if (pattern.test(userInput))
{
    const name = userInput.slice(5);

    if (accountExistsQ(name))
    {
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
                console.log('Big error');
                logger.error("Unhandled error case");

        }
    }
    else
    {
        console.log(name + ' not found in system.');
        logger.debug("User entered a name that was not in the system")
    }
}

else
{
    console.log('User did not input "List All" or "List [Account]" : ');
    //maybe send this back to the user input step now
    logger.debug("User did not input 'List All' or 'List [Account]'");
}