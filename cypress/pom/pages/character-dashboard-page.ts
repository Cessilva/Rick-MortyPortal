/// <reference types="cypress" />

import BasePOM from '../base-pom';

class CharacterDashboardPage extends BasePOM {
  constructor(testName: string = 'character-dashboard') {
    super('character-dashboard', testName);
  }

  // Navigation
  visit() {
    cy.visit('/');
    return this;
  }
}

export default CharacterDashboardPage;
