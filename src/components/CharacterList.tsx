'use client';

import Image from 'next/image';

import { useCharacters } from '@/context/CharactersContext';

import CharacterCard from './CharacterCard';
import styles from './CharacterList.module.css';
import FavoritesTab from './FavoritesTab';

export default function CharacterList() {
  const {
    characters,
    selectedCharacter,
    pagination,
    searchQuery,
    error,
    isMobile,
    handleSearch,
    handleClearSearch,
    handleCharacterSelect,
    handlePreviousPage,
    handleNextPage,
  } = useCharacters();

  // Calcular paginación basada en elementos mostrados
  const totalPages = pagination.pages;

  return (
    <div className={styles.characterList}>
      <div className={styles.characterList__container}>
        {totalPages > 1 && (
          <div className={styles.characterList__pageInfoMobile}>
            Página {pagination.currentPage} de {totalPages} • {pagination.count}{' '}
            personajes totales
          </div>
        )}

        <div className={styles.characterList__searchSection}>
          <div className={styles.characterList__searchContainer}>
            <Image
              src="/Search.png"
              alt="Search"
              width={20}
              height={20}
              className={styles.characterList__searchIcon}
            />
            <input
              type="text"
              placeholder="Find your character..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              className={styles.characterList__searchInput}
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className={styles.characterList__clearButton}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <div className={styles.characterList__paginationContainer}>
            <div className={styles.characterList__pageInfo}>
              Página {pagination.currentPage} de {totalPages} •{' '}
              {pagination.count} personajes totales
            </div>
          </div>
        )}

        <div className={styles.characterList__content}>
          <div className={styles.characterList__grid}>
            {characters.length > 0 ? (
              characters
                .slice(0, isMobile ? 2 : 4)
                .map(character => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    isSelected={selectedCharacter?.id === character.id}
                    onSelect={() => handleCharacterSelect(character.id)}
                  />
                ))
            ) : (
              <div className={styles.characterList__noResults}>
                {searchQuery
                  ? `Ningún personaje encontrado con "${searchQuery}"`
                  : 'No se han cargado personajes'}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className={styles.characterList__paginationAside}>
              <div className={styles.characterList__paginationButtons}>
                <button
                  className={styles.characterList__paginationButton}
                  onClick={handlePreviousPage}
                  disabled={pagination.currentPage === 1}
                >
                  <Image
                    src="/VectorWhite.png"
                    alt="Previous"
                    width={20}
                    height={16}
                  />
                </button>
                <button
                  className={`${styles.characterList__paginationButton} ${styles.characterList__paginationButton_theme_next}`}
                  onClick={handleNextPage}
                  disabled={pagination.currentPage === totalPages}
                >
                  <Image
                    src="/VectorWhite.png"
                    alt="Next"
                    width={20}
                    height={16}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className={styles.characterList__errorMessage}>
            Error: {error}
          </div>
        )}

        <div className={styles.characterList__favoritesContainer}>
          <FavoritesTab onCharacterSelect={handleCharacterSelect} />
        </div>
      </div>
    </div>
  );
}
