const AccountApi = require('../../../api/accountApi.js');
const { Account } = require('../../../domain/domain');

var accountApi = new AccountApi();
var accounts = accountApi.getAll();

test('Create new account', () => {
    const newAccount = new Account(-1, 'John', 'Smith');
    const res = accountApi.addNew(newAccount);
    expect(res.id).toBe(accounts[accounts.length - 1].id);
});

test('Create new account - empty First Name', () => {
    const newAccount = new Account(-1, '', 'Smith');
    const res = accountApi.addNew(newAccount);
    expect(res.id).toEqual(-1);
    expect(res.validationErrors).toContain('Invalid first name');
});

test('Create new account - empty Last Name', () => {
    const newAccount = new Account(-1, 'Joe', '');
    const res = accountApi.addNew(newAccount);
    expect(res.id).toEqual(-1);
    expect(res.validationErrors).toContain('Invalid last name');
});

test('Display initial balance for new account', () => {
    const user = accountApi.getById(3);
    expect(user.balance).toBe(0);
});


