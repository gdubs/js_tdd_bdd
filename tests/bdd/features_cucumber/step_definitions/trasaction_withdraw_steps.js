const { Before, Given, When, Then } = require('cucumber');
const assert = require('assert');

const AccountApi = require('../../../../api/accountApi.js');
const TransactionApi = require('../../../../api/transactionApi.js');
const { Account, Withdrawal, Deposit, OverdraftFee, OverdraftAgreement } = require('../../../../domain/domain.js');

const transactionApi = new TransactionApi();
const accountApi = new AccountApi();
var transactions = transactionApi.getAll();

var newAccount, user, beforeBalance, afterBalance;

Given('A user {string} {string} with an overdraft agreement of {int} with a fee of {int}', function (fname, lname, amount, fee) {
    newAccount = accountApi.addNew(new Account(-1, fname, lname));
    user = accountApi.getById(newAccount.id);
    user.setOverDraftAgreement(new OverdraftAgreement(user.id, amount, fee));
    beforeBalance = user.balance;

    assert.notEqual(user.id, -1);

    
  });

When('The user witdraws {int}', function (amount) {

    transactionApi.addNew(new Deposit(0, 100, user.id));
    transactionApi.addNew(new Deposit(0, 200, user.id));
    transactionApi.addNew(new Deposit(0, 300, user.id));
    transactionApi.setAccountsForTesting(accountApi.getAll());

    const newTransaction = new Withdrawal(0, amount, user.id);
    transactionApi.addNew(newTransaction);

    user.transactions = transactionApi.getByAccountId(user.id);
    afterBalance = user.balance

    const latest = user.transactions.filter(t => !(t instanceof OverdraftFee)).reduce((p, c) => p.value > c.value ? p : c)
    assert.equal(latest.amount, newTransaction.amount);
});

Then('An Overdraft Fee transaction will be applied', function (callback) {

    user.transactions = transactionApi.getByAccountId(user.id);
    const latestId = user.transactions.reduce((p, c) => p.value > c.value ? p.id : c.id)
    const latest = user.transactions.filter(t => t.id === latestId)[0];
    assert(latest instanceof OverdraftFee);
    callback();
});