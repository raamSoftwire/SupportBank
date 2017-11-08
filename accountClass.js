class Account {
    constructor(name,amount) {
        this.name = name;
        this.amount = parseFloat(amount);
    }
}

module.exports = Account;