Feature: Create a new account for new users using first name and last name

    Scenario: Successfully create a new account
        Given A new user "Joe" "Smith"
        When A new account is submitted with first name "Joe" and last name "Smith"
        Then A new user id is returned