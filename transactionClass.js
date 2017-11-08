var moment = require('moment');


var formatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
});


class Transaction {
    constructor(date, from, to, narrative, amount) {
        this.date = moment(date,"DD/MM/YYYY",true).format("DD/MM/YYYY");
        this.from = from;
        this.to = to;
        this.narrative = narrative;
        this.amount = formatter.format(amount);
    }
}

module.exports = Transaction;