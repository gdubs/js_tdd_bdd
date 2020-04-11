const { Before, Given, When, Then } = require('cucumber');
const assert = require('assert');


Given(/^When no variable succeed$/, function () {
    assert.equal(1,1)
  });

When('When value {string} and value {string}', function (val1, val2) {
    return 'pending';
});