// ESLint complains about cy not being defined
/* eslint-disable no-undef */

describe('Todo application', () => {
  it('loads the page', () => {
    cy.server(); // Tell Cypress that we'll stub network requests

    cy.route('/api/todos', 'fixture:initialTodos.json').as('preload');

    cy.visit('/');

    cy.wait('@preload');

    cy.get('[data-cy=todo-item-3]')
      .as('item3')
      .should('have.text', 'Hello world')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked');

    cy.get('[data-cy=todo-item-4]')
      .should('have.text', 'Goodnight moon')
      .should('have.class', 'completed')
      .find('.toggle')
      .should('be.checked');
  });

  it('toggles completed state when clicking the checkbox', () => {
    cy.get('[data-cy=todo-item-3]')
      .as('item3')
      .should('not.have.class', 'completed');
    cy.get('[data-cy=todo-item-4]')
      .as('item4')
      .should('have.class', 'completed');
    cy.get('[data-cy=todo-item-3] > .view > .toggle').click();
    cy.get('[data-cy=todo-item-4] > .view > .toggle').click();
    cy.get('@item3').should('have.class', 'completed');
    cy.get('@item4').should('not.have.class', 'completed');
  });

  it('adds a new task', () => {
    cy.server();
    // Response won't be stubbed unless a response is provided, an empty string is enough.
    // Same applies when providing an options object.
    cy.route('POST', '/api/todos', '');

    cy.get('.new-todo')
      .type('Another awesome task', { delay: 40 })
      .type('{enter}');

    cy.get('[data-cy=todo-item-5] > .view > label').should(
      'have.text',
      'Another awesome task'
    );
  });
});