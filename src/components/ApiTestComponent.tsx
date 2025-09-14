'use client';

import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchCharacters,
  searchCharacters,
  setSearchQuery,
  clearSearch,
} from '@/store/slices/characterSlice';

import styles from './ApiTestComponent.module.css';

export default function ApiTestComponent() {
  const dispatch = useAppDispatch();
  const { characters, error, pagination, searchQuery } = useAppSelector(
    state => state.characters
  );

  const runTests = useCallback(async () => {
    try {
      // Get all characters
      dispatch(fetchCharacters({ page: 1 }));
    } catch (error: unknown) {
      console.error('Error running tests:', error);
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

  const handlePageChange = (page: number) => {
    if (searchQuery.trim()) {
      dispatch(searchCharacters({ page, searchQuery }));
    } else {
      dispatch(fetchCharacters({ page }));
    }
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      handlePageChange(pagination.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.pages) {
      handlePageChange(pagination.currentPage + 1);
    }
  };

  useEffect(() => {
    runTests();
  }, [runTests]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>API Test</h2>

      <div>
        <h3 className={styles.sectionTitle}>Búsqueda :</h3>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar por nombre, estado, tipo o género..."
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              onClick={() => {
                dispatch(clearSearch());
                dispatch(fetchCharacters({ page: 1 }));
              }}
              className={styles.clearButton}
            >
              ✕ Limpiar
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className={styles.sectionTitle}>Estado de la Aplicación:</h3>
        <div className={styles.infoBox}>
          <p className={styles.infoText}>
            <span className={styles.infoLabel}>Error:</span>{' '}
            {error || 'Ninguno'}
          </p>

          <p className={styles.infoText}>
            <span className={styles.infoLabel}>Páginas totales:</span>{' '}
            {pagination.pages}
          </p>
          <p className={styles.infoText}>
            <span className={styles.infoLabel}>Total de personajes:</span>{' '}
            {pagination.count}
          </p>
          {searchQuery && (
            <p className={styles.infoText}>
              <span className={styles.infoLabel}>Buscando por:</span> &quot;
              {searchQuery}&quot;
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className={styles.sectionTitle}>
          {searchQuery
            ? `Resultados para "${searchQuery}" (nombre, estado, tipo, género):`
            : 'Primeros 10 Personajes:'}
        </h3>
        <div className={styles.charactersList}>
          {characters.length > 0 ? (
            characters.slice(0, 10).map(character => (
              <div key={character.id} className={styles.characterCard}>
                <p className={styles.characterText}>
                  <span className={styles.characterLabel}>ID:</span>{' '}
                  {character.id}
                </p>
                <p className={styles.characterText}>
                  <span className={styles.characterLabel}>Nombre:</span>{' '}
                  {character.name}
                </p>
                <p className={styles.characterText}>
                  <span className={styles.characterLabel}>Estado:</span>{' '}
                  {character.status}
                </p>
                <p className={styles.characterText}>
                  <span className={styles.characterLabel}>Especie:</span>{' '}
                  {character.species}
                </p>
                <p className={styles.characterText}>
                  <span className={styles.characterLabel}>Género:</span>{' '}
                  {character.gender}
                </p>
              </div>
            ))
          ) : (
            <p className={styles.characterText}>
              {searchQuery
                ? `No se encontraron personajes que coincidan con &quot;${searchQuery}&quot;`
                : 'No hay personajes cargados aún'}
            </p>
          )}
        </div>
      </div>

      {/* Paginación */}
      {pagination.pages > 1 && (
        <div className={styles.paginationContainer}>
          <h3 className={styles.sectionTitle}>Paginación:</h3>
          <div className={styles.pagination}>
            <button
              onClick={handlePreviousPage}
              disabled={pagination.currentPage === 1}
              className={`${styles.paginationButton} ${
                pagination.currentPage === 1 ? styles.disabled : ''
              }`}
            >
              ← Anterior
            </button>

            <div className={styles.pageInfo}>
              <span className={styles.pageText}>
                Página {pagination.currentPage} de {pagination.pages}
              </span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={pagination.currentPage === pagination.pages}
              className={`${styles.paginationButton} ${
                pagination.currentPage === pagination.pages
                  ? styles.disabled
                  : ''
              }`}
            >
              Siguiente →
            </button>
          </div>

          {/* Navegation per page */}
          <div className={styles.pageNumbers}>
            {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
              const startPage = Math.max(1, pagination.currentPage - 2);
              const pageNumber = startPage + i;
              if (pageNumber > pagination.pages) return null;

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`${styles.pageNumber} ${
                    pageNumber === pagination.currentPage ? styles.active : ''
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
