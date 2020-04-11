const { Before, Given, When, Then } = require('cucumber') 
const assert = require('assert');

//const TestApi = require('../../../api/testApi.js');
const AccountApi = require('../../../../api/accountApi.js');
const { Account } = require('../../../../domain/domain.js');

var accountApi = new AccountApi();
var accounts = accountApi.getAll();
var newAccount;
var result;

Given('the first name {string} and last name {string}', function (fname, lname, callback) {
    console.log('fname ' + fname + ' lname ' + lname)
    newAccount = new Account(-1, fname, lname);
    //expect(newAccount.id).toBe(-1);
    //return assert.ok(newAccount.id == -1);
    callback(null, 'pending');
});


When('a new account is submitted', function (callback) {
    result = accountApi.addNew(newAccount);
    callback(null, 'pending');
});

Then('should the result be {int}', function (int, callback) {
    assert.notEqual(result.id, int)
    callback();
});