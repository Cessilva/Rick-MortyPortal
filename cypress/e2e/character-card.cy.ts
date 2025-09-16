/// <reference types="cypress" />

import CharacterCardPOM from '../pom/components/character-card-pom';

describe('Character Card Component  ', () => {
  const characterCard = new CharacterCardPOM('character-card-visual');

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Visual Elements', () => {
    it('should load the application', () => {
      characterCard.visit();
      cy.get('body').should('be.visible');
    });
  });
});
