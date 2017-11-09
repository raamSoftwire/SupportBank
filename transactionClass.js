var moment = require('moment');

class Transaction {
    constructor(date, from, to, narrative, amount) {
        this.date = moment(date,["DD/MM/YYYY","YYYY-MM-DD"],'en').format("DD/MM/YYYY");
        this.from = from;
        this.to = to;
        this.narrative = narrative;
        this.amount = parseFloat(amount);
    }
}

module.exports = Transaction;