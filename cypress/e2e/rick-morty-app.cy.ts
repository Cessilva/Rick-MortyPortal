/// <reference types="cypress" />

import CharacterDashboardPage from '../pom/pages/character-dashboard-page';

describe('Rick & Morty App ', () => {
  const dashboardPage = new CharacterDashboardPage('visual-integration');

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Dashboard Visual Layout', () => {
    it('should load the application', () => {
      dashboardPage.visit();
      cy.get('body').should('be.visible');
    });
  });
});
