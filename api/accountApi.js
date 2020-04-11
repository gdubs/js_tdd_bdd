const { Account, OverdraftFee } = require('../domain/domain');
const data = require('./data.json');

class AccountApi {
    constructor(){

        // maps json objects to it's appropriate class
        this.data = data.accounts.map((a, idx) => {
            const newObj = new Account(idx + 1, a.firstName, a.lastName);
            return newObj;
        });
    }
    
    getAll = function() { return this.data; }
    getById = function(id) { return this.data.filter(u => u.id == id)[0]; }
    addNew = (newAccount) => {
        const mostRecentId = this.data.length > 0 ? this.data.reduce((p, c) => p.value > c.value ? p.id : c.id) : 0;
        
        if(newAccount.validationErrors.length < 1){
            newAccount.id = mostRecentId + 1;
            this.data.push(newAccount);
        }
        
        return newAccount;
    };
}

module.exports = AccountApi;