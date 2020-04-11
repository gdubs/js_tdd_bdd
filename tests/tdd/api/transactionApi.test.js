const TransactionApi = require('../../../api/transactionApi.js');
const AccountApi = require('../../../api/accountApi.js');
const { Deposit, Withdrawal, OverdraftAgreement, OverdraftFee, Account } = require('../../../domain/domain');


const transactionApi = new TransactionApi();
const accountApi = new AccountApi();
var transactions = transactionApi.getAll();

const newAccount = new Account(-1, 'John', 'Smith');
const newUser = accountApi.addNew(newAccount);
var user = accountApi.getById(newUser.id);

test('Deposit funds', () => {
    user.transactions = transactionApi.getByAccountId(user.id);
    const beforeBalance = user.balance;

    const newTransaction = new Deposit(0, 300, user.id);
    transactionApi.addNew(newTransaction);

    // refresh transactions
    user.transactions = transactionApi.getByAccountId(user.id);
    const afterBalance = user.balance

    expect(afterBalance).toBeGreaterThan(beforeBalance);
})


test('Witdraw funds', () => {
    user.transactions = transactionApi.getByAccountId(user.id);
    const beforeBalance = user.balance;

    const newTransaction = new Withdrawal(0, 100, user.id);
    transactionApi.addNew(newTransaction);

    // refresh transactions
    user.transactions = transactionApi.getByAccountId(user.id);
    const afterBalance = user.balance;

    expect(afterBalance).toBeLessThan(beforeBalance);
})

test('Apply overdraft based on overdraft agreement', () => {

    transactionApi.setAccountsForTesting(accountApi.getAll());

    user.transactions = transactionApi.getByAccountId(user.id);
    
    const beforeBalance = user.balance;

    user.setOverDraftAgreement(new OverdraftAgreement(user.id, 200, 30));

    const newTransaction = new Withdrawal(0, 401, user.id);

    transactionApi.addNew(newTransaction);

    // refresh the list just like when reloading from an api. 
    // can add directly to the user.transactions but assume you 
    // need to directly update from api after transaction

    user.transactions = transactionApi.getByAccountId(user.id);

    console.log(user)
    const afterBalance = user.balance;

    expect(afterBalance).toBe(-231);
})