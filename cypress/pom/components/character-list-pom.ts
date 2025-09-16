/// <reference types="cypress" />

import BasePOM from '../base-pom';

class CharacterListPOM extends BasePOM {
  constructor(testName: string = 'character-list') {
    super('character-list', testName);
  }

  // Navigation
  visit() {
    cy.visit('/');
    return this;
  }

  locators = {
    // Search elements
    searchInput: () => cy.get('input[placeholder="Find your character..."]'),
    clearButton: () => cy.contains('button', '✕'),

    // Favorites
    favoritesTab: () => cy.contains('button', 'FAVS'),
  };

  // Search functionality
  searchCharacter(query: string) {
    this.fillTextField(this.locators.searchInput(), query);
    return this;
  }

  clearSearch() {
    this.clickElement(this.locators.clearButton());
    return this;
  }

  verifySearchValue(expectedValue: string) {
    this.verifyElementHasValue(this.locators.searchInput(), expectedValue);
    return this;
  }

  verifySearchEmpty() {
    this.verifyElementIsEmpty(this.locators.searchInput());
    return this;
  }

  verifySearchInput() {
    this.verifyElementIsVisible(this.locators.searchInput());
    return this;
  }

  verifyFavoritesTab() {
    this.verifyElementIsVisible(this.locators.favoritesTab());
    return this;
  }
}

export default CharacterListPOM;
