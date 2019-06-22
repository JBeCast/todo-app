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
const _ = require('lodash');

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

const loMethods = _.functions(_).map(fn => `lo_${fn}`);

loMethods.forEach(loFn => {
  const loName = loFn.replace(/^lo_/, '');
  Cypress.Commands.add(loFn, { prevSubject: true }, (subject, fn) => {
    const result = _[loName](subject, fn);
    Cypress.log({
      name: loFn,
      message: JSON.stringify(result),
      consoleProps: () => result,
    });
    return result;
  });
});
