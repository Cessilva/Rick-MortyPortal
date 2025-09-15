'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchCharacters,
  searchCharacters,
  setSearchQuery,
  clearSearch,
} from '@/store/slices/characterSlice';

import CharacterCard from './CharacterCard';
import styles from './CharacterList.module.css';

export default function CharacterList() {
  const dispatch = useAppDispatch();
  const { characters, error, pagination, searchQuery } = useAppSelector(
    state => state.characters
  );
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null
  );

  // Cargar datos iniciales
  useEffect(() => {
    if (characters.length === 0) {
      dispatch(fetchCharacters({ page: 1 }));
    }
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    if (query.trim()) {
      dispatch(searchCharacters({ page: 1, searchQuery: query }));
    } else {
      dispatch(fetchCharacters({ page: 1 }));
    }
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
    dispatch(fetchCharacters({ page: 1 }));
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      const newPage = pagination.currentPage - 1;
      if (searchQuery.trim()) {
        dispatch(searchCharacters({ page: newPage, searchQuery }));
      } else {
        dispatch(fetchCharacters({ page: newPage }));
      }
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.pages) {
      const newPage = pagination.currentPage + 1;
      if (searchQuery.trim()) {
        dispatch(searchCharacters({ page: newPage, searchQuery }));
      } else {
        dispatch(fetchCharacters({ page: newPage }));
      }
    }
  };

  const handleCharacterSelect = (characterId: number) => {
    setSelectedCharacterId(characterId);
  };

  return (
    <div className={styles.characterList}>
      <div className={styles.characterList__container}>
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

        {error && (
          <div className={styles.characterList__errorMessage}>
            Error: {error}
          </div>
        )}

        <div className={styles.characterList__content}>
          <div className={styles.characterList__grid}>
            {characters.length > 0 ? (
              characters
                .slice(0, 6)
                .map(character => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    isSelected={selectedCharacterId === character.id}
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

          {pagination.pages > 1 && (
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
                  disabled={pagination.currentPage === pagination.pages}
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

        {pagination.pages > 1 && (
          <div className={styles.characterList__paginationContainer}>
            <div className={styles.characterList__pageInfo}>
              Página {pagination.currentPage} de {pagination.pages} •{' '}
              {pagination.count} personajes totales
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
