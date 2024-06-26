Feature: Auth API

  Scenario: Authenticate with valid CPF
    Given a user with CPF "41115491873"
    When the user sends a POST request to "/customer/auth"
    Then the response should be 200
    And the response should contain a JWT token

  Scenario: Authenticate with invalid CPF
    Given a user with CPF "1"
    When the user sends a POST request to "/customer/auth"
    Then the response should be 400
    And the response should contain an error message "Invalid CPF."

  Scenario: Authenticate with empty CPF
    Given a user with CPF ""
    When the user sends a POST request to "/customer/auth"
    Then the response should be 400
    And the response should contain an error message "CPF is required."