// const log4js = require('log4js');
// const moment = require('moment');
// const Transaction = require('./transactionClass');
//
// const logger = log4js.getLogger('parseTransactions.js');
//
// function parseTransactions(){
//     var keys = Object.keys(records[1]);
//
//     for(let i in records)
//     {
//         let lineValue = parseInt(i) + 2; // +1 for header row, +1 for zero base
//
//         if(!moment(records[i]['Date'],["DD/MM/YYYY","YYYY-MM-DD"],'en').isValid())
//         {
//             logger.error("Invalid date found in line " + lineValue +
//                 " : " + records[i]['Date']);
//         }
//
//         else if (isNaN(parseFloat(records[i]['Amount'])))
//         {
//             logger.error("Invalid amount found in line " + lineValue
//                 + " : " + records[i]['Amount'])
//         }
//         else
//         {
//             transaction = new Transaction(
//                 records[i][keys[0]],
//                 records[i][keys[1]],
//                 records[i][keys[2]],
//                 records[i][keys[3]],
//                 records[i][keys[4]]);
//
//             transactions.push(transaction);
//             //transaction not added to list of transactions
//         }
//     }
//     logger.info("Successfully parsed " + transactions.length + " of " + records.length +
//         " transactions");
// }
//
// module.exports = parseTransactions;