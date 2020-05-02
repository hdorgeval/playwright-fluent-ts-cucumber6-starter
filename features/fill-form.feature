
# all tags at top of file are processed by a before hook in common-hooks.ts
@recordRequests

Feature: Fill Form

Background: Open Form Component
    Given I navigate to "https://reactstrap.github.io"
    And I open the "Components" page
    And I select the "Form" component

# tag the scenario with @live to run the browser in headfull mode
#   and keep browser opened when test finishes

# all tags used at the scenario level are used either to :
#   - filter tests to run on CI
#   - change the execution behavior of the scenario (@live or @debug or @ignore)
#   - in a dedicated before/after hook in the step file where steps are defined
@live
Scenario: Submit a Form
    Given I input "foo.bar@baz.com" in field "Email"

