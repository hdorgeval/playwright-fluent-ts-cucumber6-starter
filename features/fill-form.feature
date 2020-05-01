
# all tags at top of file are processed by a before hook in common-hooks.ts
@recordRequests

Feature: Fill Form

# Background: Open Form Component

# tag the scenario with @live to run the browser in headfull mode
#   and keep browser opened when test finishes

@live
Scenario: Submit a Form
    Given I navigate to "https://reactstrap.github.io"
