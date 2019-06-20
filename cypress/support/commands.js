// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/* eslint-disable no-undef */

Cypress.Commands.add('store', (stateName = '') => {
  const log = Cypress.log({ name: 'store' });
  const cb = state => {
    log.set({
      message: JSON.stringify(state),
      consoleProps: () => state,
    });
    return state; // return state so we can chain cy commands
  };

  return cy
    .window({ log: false })
    .then($window => $window.store.getState())
    .then(state =>
      stateName.length > 0
        ? cy
            .wrap(state, { log: false }) // wrap so we can chain cy methods
            .its(stateName)
            .then(cb)
        : cy.wrap(state, { log: false }).then(cb)
    );
});
