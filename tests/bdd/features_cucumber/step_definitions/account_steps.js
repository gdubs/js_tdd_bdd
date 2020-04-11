const { Before, Given, When, Then } = require('cucumber');
const assert = require('assert');

//const TestApi = require('../../../api/testApi.js');
const AccountApi = require('../../../../api/accountApi.js');
const { Account } = require('../../../../domain/domain.js');

var accountApi = new AccountApi();
var accounts = accountApi.getAll();
var newAccount;
var result;

Given('A new user {string} {string}', function (fname, lname) {
    newAccount = new Account(-1, fname, lname);
    assert.equal(newAccount.id, -1);
  });

When('A new account is submitted with first name {string} and last name {string}', function (fname, lname) {
    result = accountApi.addNew(newAccount);
    assert.notEqual(result, -1);
});

Then('A new user id is returned', function (callback) {
    assert.equal(result.id, 3);
    callback();
});