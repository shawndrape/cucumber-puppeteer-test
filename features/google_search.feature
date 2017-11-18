Feature: Searching on Google

    Scenario: Doing a simple search
        When I navigate to https://google.com
        And I type "Random String" into the search bar
        And I hit Enter

        Then I should see text "Showing results for Random String"