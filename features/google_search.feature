Feature: Searching on Google
    Background:
        When I navigate to https://google.com

    Scenario: Doing a random search
        When I type "Random String" into the search bar
        And I hit Enter

        Then the number 2 link should be for "Random string generator - Special - Unit conversion"

    Scenario: Doing a search for bananas
        When I type "Banana Bread" into the search bar
        And I hit Enter

        Then the number 5 link should be for "Ultra Moist Banana Bread | Ricardo"