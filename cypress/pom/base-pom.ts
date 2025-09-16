/// <reference types="cypress" />

class BasePOM {
  protected module: string;
  protected testName: string;

  constructor(module: string, testName: string) {
    this.module = module;
    this.testName = testName;
  }

  protected fillTextField(field: Cypress.Chainable, value: string) {
    field.clear().type(value);
    return this;
  }

  protected clickElement(element: Cypress.Chainable) {
    element.click();
    return this;
  }

  protected waitForElement(
    element: Cypress.Chainable,
    timeout: number = 10000
  ) {
    element.should('be.visible', { timeout });
    return this;
  }

  protected verifyElementText(
    element: Cypress.Chainable,
    expectedText: string
  ) {
    element.should('contain.text', expectedText);
    return this;
  }

  protected verifyElementCount(
    element: Cypress.Chainable,
    expectedCount: number
  ) {
    element.should('have.length', expectedCount);
    return this;
  }

  protected verifyElementNotExists(element: Cypress.Chainable) {
    element.should('not.exist');
    return this;
  }

  protected verifyElementIsVisible(element: Cypress.Chainable) {
    element.should('be.visible');
    return this;
  }

  protected verifyElementIsEnabled(element: Cypress.Chainable) {
    element.should('be.enabled');
    return this;
  }

  protected verifyElementIsDisabled(element: Cypress.Chainable) {
    element.should('be.disabled');
    return this;
  }

  protected verifyElementHasValue(element: Cypress.Chainable, value: string) {
    element.should('have.value', value);
    return this;
  }

  protected verifyElementIsEmpty(element: Cypress.Chainable) {
    element.should('have.value', '');
    return this;
  }
}

export default BasePOM;
