Feature: Perform withdrawal and deposits and apply overdraft when needed

    Scenario: Successfully Deposit
        Given A user "Joe" "Smith" 
        When The user deposits 300
        Then The account balance is greater than the previous balance