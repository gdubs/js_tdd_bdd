class Validation{
    constructor(){
        this.isNotEmpty = this.isNotEmptyRule.bind(this);
        this.isString = this.isStringRule.bind(this);
        this.validate = this.validateValue.bind(this);
    }

    isStringRule(value){
        if (typeof value === 'string') {
            return true;
        }
        return false;
    }
    isNotEmptyRule(value){
        if(value !== '' && value !== null && typeof value !== 'undefined'){
            return true;
        }
        return false;
    }

    validateValue(value, rules){
        const self = this;
        return rules.every((rule) => {
            return self[rule](value);
        })
    }
}


module.exports = {
    Validation
}