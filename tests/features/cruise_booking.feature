Feature: Azamara Cruise Booking Journey
  As a customer
  I want to book a cruise through the Azamara platform
  So that I can complete the entire booking flow

  Scenario: Complete cruise booking flow for Spain & Italy journey
    Given I navigate to the Azamara SSO login page
    When I login with valid credentials
    And I accept all cookies
    And I open the main menu
    And I navigate to cruise search
    And I search for cruises with the following criteria
      | Departure Date | 10             |
      | Month          | 3              |
      | Gender         | Male           |
    And I select the "JOURNEY 8-Night Spain & Italy" cruise
    And I proceed with selected cruise
    And I add guest information
      | Name       | testuser      |
      | LastName   | one           |
      | Gender     | Female        |
      | Country    | UKRAINE       |
      | Residence  | UNITED STATES |
      | Email      | ancjj@yopmail.com |
      | Phone      | 5324652656778    |
    Then I complete the booking with payment confirmation
