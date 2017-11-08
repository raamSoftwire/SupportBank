var formatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
});

class Account {
    constructor(name,amount) {
        this.name = name;
        this.amount = formatter.format(amount);
    }
}

module.exports = Account;