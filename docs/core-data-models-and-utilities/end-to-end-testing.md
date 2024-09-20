### End-to-End Testing

References: `/apps/duality-social-react-e2e`

The end-to-end (E2E) tests for the Duality Social React application are located in the `/apps/duality-social-react-e2e` directory. These tests are written using the Cypress testing framework and focus on verifying the application's welcome message functionality.

The main test suite is defined in the `/apps/duality-social-react-e2e/src/e2e/app.cy.ts` file. This file contains a single test case named [`'should display welcome message'`](/apps/duality-social-react-e2e/src/e2e/app.cy.ts#L6) that performs the following steps:

- Logs in to the application using the [`cy.login()`](/apps/duality-social-react-e2e/src/e2e/app.cy.ts#L8) custom command, which is defined in the `/apps/duality-social-react-e2e/src/support/commands.ts` file.
- Verifies the welcome message by using the [`getGreeting()`](/apps/duality-social-react-e2e/src/support/app.po.ts#L1) function, which is defined in the `/apps/duality-social-react-e2e/src/support/app.po.ts` file. This function retrieves the [`h1`](/apps/duality-social-react-e2e/src/support/app.po.ts#L1) element from the application and checks that it contains the expected text [`'Welcome duality-social-react'`](/apps/duality-social-react-e2e/src/e2e/app.cy.ts#L11).

The `/apps/duality-social-react-e2e/src/support/commands.ts` file defines the [`cy.login()`](/apps/duality-social-react-e2e/src/e2e/app.cy.ts#L8) custom command, which currently only logs the provided email and password to the console. In a real-world application, this command would likely interact with the application's login functionality.

The `/apps/duality-social-react-e2e/src/support/app.po.ts` file contains the [`getGreeting()`](/apps/duality-social-react-e2e/src/support/app.po.ts#L1) function, which uses the Cypress [`cy.get()`](/apps/duality-social-react-e2e/src/support/app.po.ts#L1) method to select the [`h1`](/apps/duality-social-react-e2e/src/support/app.po.ts#L1) element from the application being tested.

The `/apps/duality-social-react-e2e/cypress.config.ts` file is the Cypress configuration file for the Duality Social React application. It uses the [`nxE2EPreset()`](/apps/duality-social-react-e2e/cypress.config.ts#L2) function from the `@nx/cypress/plugins/cypress-preset` module to set up the Cypress e2e tests for the project.
