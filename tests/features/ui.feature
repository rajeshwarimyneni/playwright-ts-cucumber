Feature: UI Testing

  Background:
    Given the browser is launched

  Scenario: Navigate and verify page title
    When I navigate to "https://example.com"
    Then the page title should contain "Example"
    And the page should be fully loaded

  Scenario: Interact with page elements
    When I navigate to "https://example.com"
    And I wait for element "h1" to appear
    Then I should see text "Example Domain" in the page

  Scenario: Capture form interaction
    Given I navigate to a test form page
    When I fill the form with:
      | Field | Value           |
      | name  | John Doe        |
      | email | john@example.com |
    And I submit the form
    Then I should see success confirmation
    And the page URL should contain "success"
