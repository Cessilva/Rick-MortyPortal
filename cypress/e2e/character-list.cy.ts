/// <reference types="cypress" />

import CharacterListPOM from '../pom/components/character-list-pom';

describe('Character List Component  ', () => {
  const characterList = new CharacterListPOM('character-list-visual');

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe(' Visual Components', () => {
    it('should load the application', () => {
      characterList.visit();
      cy.get('body').should('be.visible');
    });

    it('should display search input', () => {
      characterList.visit().verifySearchInput();
    });

    it('should display favorites tab', () => {
      characterList.visit().verifyFavoritesTab();
    });
  });

  describe('Search Functionality', () => {
    beforeEach(() => {
      characterList.visit();
    });

    it('should allow typing in search input', () => {
      characterList.searchCharacter('Rick').verifySearchValue('Rick');
    });

    it('should show clear button when typing', () => {
      characterList.searchCharacter('Rick').verifySearchValue('Rick');
    });

    it('should clear search when clicking clear button', () => {
      characterList.searchCharacter('Rick').clearSearch().verifySearchEmpty();
    });
  });
});
