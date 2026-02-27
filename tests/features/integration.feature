Feature: API + UI Integration Testing

  Scenario: Verify API response in UI
    Given the API base URL is set to "https://jsonplaceholder.typicode.com"
    When I send a GET request to "/users/1"
    And the response status code is 200
    And I display the API response data on a test page
    Then the UI should display the user data correctly
    And all API fields should be visible in the UI

  Scenario: Create data via API and verify in UI
    When I create a new post via API with title "Automation Test"
    And I navigate to the posts list page
    Then the newly created post should be visible in the UI
    And the post title matches the API response
