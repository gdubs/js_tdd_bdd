Feature: Create a new account

    Scenario: Successfully create a new account
        Given the first name Joe and last name Smith
        When a new account is submitted
        Then a new user id is returned