## 1. 연습 문제
* Confirm "Loading" shows while contacting server(./tests/orderPhase.test.js)
  * async events
  * check that element disappear from DOM

* Optionally show "Toppings" on summary page(./tests/orderPhase.test.js)
  * happy path test with different path
  * confirm elment is not on page

* Diable order button if no scoops are ordered(./pages/entry/tests/OrderEntry.test.js)
  * conditions for button to be enabled
  * jest mock function passed as prop

* Validate scoop count value(./pages/entry/tests/ScoopOption.test.js)
  * jest-dom toHaveClass assertion

* Don't update total if scoop count is invaild(./pages/entry/tests/Options.test.js)
  * prerequisite - Validate scoop count value
  * minimum component to test

* Show alert for error when submitting order(./pages/confirmation/tests/ORderConfirmation.test.js)
  * error response from server
