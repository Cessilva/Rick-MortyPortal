/// <reference types="cypress" />

import BasePOM from '../base-pom';

class CharacterCardPOM extends BasePOM {
  constructor(testName: string = 'character-card') {
    super('character-card', testName);
  }

  // Navigation
  visit() {
    cy.visit('/');
    return this;
  }
}

export default CharacterCardPOM;
