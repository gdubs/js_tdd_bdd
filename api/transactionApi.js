const { Transaction, Withdrawal, Deposit, OverdraftFee } = require('../domain/domain');
const data = require('./data.json');

class TransactionApi{
    constructor(){
        
        // maps json objects to it's appropriate class
        this.data = data.transactions.map(a => Object.assign(new Transaction, a));
        this.accounts = [];
    }

    // this is just to persist data since need to mock hitting an api for accounts
    setAccountsForTesting(accounts){
        this.accounts = accounts;
    }

    getAll = () => this.data;
    getById = (id) => this.data.filter(t => t.id == id);
    getByAccountId = (accountId) => {
        return this.data.filter(t => t.accountId == accountId)
    };
    addNew (transaction) {
        const mostRecentId = this.data.length > 0 ? this.data.reduce((p, c) => p.value > c.value ? p.id : c.id) : 0;
        transaction.id = mostRecentId + 1;        
        this.data.push(transaction);

        // checking for the owner of the transaction if it has reached the overdraftagreement balance
        // when last transaction is not of type Overdraft or Deposit
        if(transaction instanceof Withdrawal){
            this.applyOverdraft(transaction.accountId);
        }
    };

    applyOverdraft = (accountId) => {
        
        const account = this.accounts.filter(a => a.id == accountId);
        let user = account[0];
        
        if(user === null || typeof user === 'undefined')
            return;

        user.transactions = this.getByAccountId(accountId);

        if(user.overdraftAgreement != null && (user.balance < (-Math.abs(user.overdraftAgreement.negativeBalanceLimit)))){
            console.log('overdraft')
            this.addNew(new OverdraftFee(-1, user.overdraftAgreement.fee, user.id));
        }
    }
}

module.exports = TransactionApi;