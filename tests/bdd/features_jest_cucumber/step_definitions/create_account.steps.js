import { defineFeature, loadFeature } from 'jest-cucumber';
 
const feature = loadFeature('../create_account.feature');


defineFeature(feature, test => {
    test('Successfully create a new account', ({ given, when, then }) => {

        let newAccount; 
        
        given('the first name {string} and last name {string}', (fname, lname, callback) => {
            console.log('fname ' + fname + ' lname ' + lname)
            newAccount = new Account(-1, fname, lname);
            expect(newAccount.id).toBe(-1);
        });
    });
  });