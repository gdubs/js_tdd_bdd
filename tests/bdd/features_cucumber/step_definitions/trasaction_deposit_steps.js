const { Before, Given, When, Then } = require('cucumber');
const assert = require('assert');

const AccountApi = require('../../../../api/accountApi.js');
const TransactionApi = require('../../../../api/transactionApi.js');
const { Account, Withdrawal, Deposit, OverdraftFee } = require('../../../../domain/domain.js');

const transactionApi = new TransactionApi();
const accountApi = new AccountApi();
var transactions = transactionApi.getAll();

var newAccount, user, beforeBalance, afterBalance;

Given('A user {string} {string}', function (fname, lname) {
    newAccount = accountApi.addNew(new Account(-1, fname, lname));
    user = accountApi.getById(newAccount.id);
    beforeBalance = user.balance;

    assert.notEqual(user.id, -1);
  });

When('The user deposits {int}', function (amount) {
    const newTransaction = new Deposit(0, amount, user.id);
    transactionApi.addNew(newTransaction);
    
    user.transactions = transactionApi.getByAccountId(user.id);
    afterBalance = user.balance

    const latest = user.transactions.reduce((p, c) => p.value > c.value ? p.id : c.id)
    assert.equal(latest.amount, newTransaction.amount);
});

Then('The account balance is greater than the previous balance', function (callback) {
    assert(afterBalance > beforeBalance);
    callback();
});