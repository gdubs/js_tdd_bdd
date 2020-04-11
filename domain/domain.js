const { Validation } = require('../util/utils');

class Account{
    constructor(id, firstName, lastName){
        this.id = id;
        this.firstName = {
            value: null,
            validationRules: ['isNotEmpty']
        };

        this.lastName = {
            value: null,
            validationRules: ['isNotEmpty']
        };

        this.overdraftAgreement = null;

        this.transactions = [];
        this.validator = new Validation();
        this.validationErrors = [];

        this.setFirstName(firstName);
        this.setLastName(lastName);
    }

    get balance(){
        const balance = this.transactions.reduce((a, b) => { 
            return (b.type == 'Deposit') ? a + b.amount : a - b.amount;
        }, 0);
        return this.transactions.length > 0 ? balance : 0;
    }

    setOverDraftAgreement(overDraftAgreement){
        this.overdraftAgreement = overDraftAgreement;
    }

    setFirstName(value){
        if(this.validator.validate(value, this.firstName.validationRules)){
            this.firstName.value = value;
        }else{
            this.validationErrors.push('Invalid first name');
        }
    }

    setLastName(value){
        if(this.validator.validate(value, this.lastName.validationRules)){
            this.lastName.value = value;
        }else{
            this.validationErrors.push('Invalid last name');
        }
    }
}

class Transaction{
    constructor(id, amount, accountId){
        this.id = id;
        this.accountId = accountId;
        this.amount = amount;
    }
}

class Withdrawal extends Transaction{
    constructor(id, amount, accountId){
        super(id, amount, accountId);
        this.type = 'Withdrawal';
    }
}
class Deposit extends Transaction{
    constructor(id, amount, accountId){
        super(id, amount, accountId);
        this.type = 'Deposit';
    }
}
class OverdraftFee extends Transaction {
    constructor(id, amount, accountId){
        super(id, amount, accountId);
        this.type = 'OverdraftFee';
    }
}
class OverdraftAgreement{
    constructor(accountId, negativeBalanceLimit, fee){
        this.accountId = accountId;
        this.fee = fee;
        this.negativeBalanceLimit = negativeBalanceLimit
    }
}

module.exports =  {
    Account,
    Transaction,
    Withdrawal,
    Deposit,
    OverdraftFee,
    OverdraftAgreement
}