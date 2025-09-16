/// <reference types="cypress" />

import BasePOM from '../base-pom';

class CharacterViewPOM extends BasePOM {
  constructor(testName: string = 'character-view') {
    super('character-view', testName);
  }

  // Navigation
  visit() {
    cy.visit('/');
    return this;
  }
}

export default CharacterViewPOM;
