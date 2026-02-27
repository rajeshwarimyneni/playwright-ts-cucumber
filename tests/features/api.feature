Feature: API Testing

  Background:
    Given the API base URL is set to "https://jsonplaceholder.typicode.com"

  Scenario: Retrieve user data successfully
    When I send a GET request to "/users/1"
    Then the response status code should be 200
    And the response should contain user data with id 1

  Scenario: Create a new post via API
    When I send a POST request to "/posts" with the following data:
      | title | body           | userId |
      | Test  | Test post body | 1      |
    Then the response status code should be 201
    And the response should contain id field

  Scenario: Update existing post
    When I send a PUT request to "/posts/1" with the following data:
      | title | body              |
      | Updated | Updated body   |
    Then the response status code should be 200

  Scenario: Delete a post
    When I send a DELETE request to "/posts/1"
    Then the response status code should be 200

  Scenario: Validate error handling
    When I send a GET request to "/users/invalidId"
    Then the response status code should be 404
