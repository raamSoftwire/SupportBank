const Account = require('./accountClass');
const accountExistsQ = require('./accountExistsQ');

function createAccounts()
{
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
}

module.exports = createAccounts;