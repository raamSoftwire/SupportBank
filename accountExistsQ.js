function accountExistsQ(string) {
   check = false;

    for (let i in accounts)
    {
        if(accounts[i].name === string)
            check = true;
    }
    return check;
}

module.exports = accountExistsQ;