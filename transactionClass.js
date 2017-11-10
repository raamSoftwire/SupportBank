var moment = require('moment');
const log4js = require('log4js');


const logger = log4js.getLogger('transactionClass.js');

class Transaction {
    constructor(date, from, to, narrative, amount) {
        this.date = date;
        this.from = from;
        this.to = to;
        this.narrative = narrative;
        this.amount = amount;
    }

    // constructor(date, from, to, narrative, amount) {
    //     this.date = moment(date,["DD/MM/YYYY","YYYY-MM-DD"],'en').format("DD/MM/YYYY");
    //     this.from = from;
    //     this.to = to;
    //     this.narrative = narrative;
    //     this.amount = parseFloat(amount);
    // }


    isValidTransaction() {
        let validity = true;

        if(!moment(this.date,["DD/MM/YYYY","YYYY-MM-DD"],'en').isValid())
        {
            logger.error("Invalid date found in line X : " + this.date);
            validity = false;
        }

        if (isNaN(parseFloat(this.amount)))
        {
            logger.error("Invalid amount found in line X : " + this.amount);
            validity = false;
        }

        return validity;
    }

    processTransaction(){
        if(this.isValidTransaction())
        {
            this.date =  moment(date,["DD/MM/YYYY","YYYY-MM-DD"],'en').format("DD/MM/YYYY");
            this.amount = parseFloat(amount);
        }
        else
        {
            // skip this transaction
            //log something
            console.log("Bad transaction");
        }




    }






}





module.exports = Transaction;