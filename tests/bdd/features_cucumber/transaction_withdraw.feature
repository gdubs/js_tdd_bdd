Feature: Perform withdrawal and apply overdraft if needed

    Scenario: Successfully Withdraws
        Given A user "Joe" "Smith" with an overdraft agreement of 200 with a fee of 20
        When The user witdraws 900
        Then An Overdraft Fee transaction will be applied