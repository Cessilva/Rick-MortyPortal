/// <reference types="cypress" />

import CharacterViewPOM from '../pom/components/character-view-pom';

describe('Character View Component  ', () => {
  const characterView = new CharacterViewPOM('character-view-visual');

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe(' Visual Elements', () => {
    it('should load the application', () => {
      characterView.visit();
      cy.get('body').should('be.visible');
    });
  });
});
