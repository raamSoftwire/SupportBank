const fs = require('fs'); //file system
const parse = require('csv-parse/lib/sync');
const readlineSync = require('readline-sync');
const log4js = require('log4js');
const xml2js = require ('xml2js');
const moment = require('moment');

const Transaction = require('./transactionClass');

const accountExistsQ = require('./accountExistsQ');
const createAccounts = require('./createAccounts');

const formatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    });

log4js.configure({
    appenders: {file: { type: 'fileSync', filename: 'logs/debug.log' }},
    categories: {default: { appenders: ['file'], level: 'debug'}}
});

const logger = log4js.getLogger('index.js');
logger.debug("Program starting up...")

function isValidRecord(record) {
    validity = true;

    if(!moment(record['Date'],["DD/MM/YYYY","YYYY-MM-DD"],'en').isValid())
    {
        logger.error("Invalid date found in line " + lineValue +
            " : " + record['Date']);
        validity = false;
    }

    if (isNaN(parseFloat(record['Amount'])))
    {
        logger.error("Invalid amount found in line " + lineValue
            + " : " + record['Amount']);
        validity = false;
    }

    return validity;
}

function parseTransactions(){

    for(let i in records)
    {
        var keys = Object.keys(records[1]);

        let lineValue = parseInt(i) + 2; // +1 for header row, +1 for zero base

        if(isValidRecord(records[i]))
        {
            var keys = Object.keys(records[i]);

            transaction = new Transaction(
                records[i][keys[0]],
                records[i][keys[1]],
                records[i][keys[2]],
                records[i][keys[3]],
                records[i][keys[4]]);

            transactions.push(transaction);
        }

    }
    logger.info("Successfully parsed " + transactions.length + " of " + records.length +
        " transactions");
}


function importFile(fileName) {
    var ext = fileName.split('.').pop();
    if(ext === "csv")
    {
        try {
            const inputString = fs.readFileSync(dataFile).toString();
            const unprocessedTransactions = parse(inputString, {columns: true});
            transactions = [];

            for (i in unprocessedTransactions)
            {
                transaction = new Transaction(
                    unprocessedTransactions['Date'],
                    unprocessedTransactions['From'],
                    unprocessedTransactions['To'],
                    unprocessedTransactions['Narrative'],
                    unprocessedTransactions['Amount']);

                transactions.push(transaction);
            }


            // return records.map(function(record) {
            //
            //     return new Transaction(record.date);
            // });

            return transactions;
        }

        catch(err)
        {
           if (err.code === 'ENOENT') {
               console.log("File does not exist");
               process.exit();
           }
        }

    }
    else if (ext === 'json')
    {
        try {
            const inputArray = fs.readFileSync(dataFile).toString();
            const records = JSON.parse(inputArray);
            return records;
        }
        catch(err)
        {
            if (err.code === 'ENOENT') {
                console.log("File does not exist");
                process.exit();
            }
        }
    }
    else if (ext === 'xml')
    {
        try {
            const inputArray = fs.readFileSync(dataFile).toString();

            var parser = new xml2js.Parser();
            const records = parser.parseString(inputArray);
            return records;
        }
        catch(err)
        {
            if (err.code === 'ENOENT') {
                console.log("File does not exist");
                process.exit();
            }
        }
    }


    else
    {
        console.log("Please enter the name of a suitable CSV,JSON or XML file")
    }

}



const dataFile = readlineSync.question('Please enter the transaction filename : ');

// records = importFile(dataFile);



// transactions = [];
// parseTransactions(); //parses records into transactions

transactions = importFile(dataFile);

for (i in transactions)
{
    transactions[i].processTransaction();
}


accounts = [];
createAccounts(); //works through all transactions and creates all necessary accounts


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
    logger.debug("User did not input 'List All' or 'List [Account]' : " + userInput );
}