'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';

import {
  Character,
  PaginationInfo,
  fetchCharacters,
  searchCharacters,
  fetchCharacterDetails,
} from '@/services/characterService';

interface CharactersContextType {
  characters: Character[];
  selectedCharacter: Character | null;
  pagination: PaginationInfo;
  searchQuery: string;
  error: string | null;
  loading: boolean;
  isMobile: boolean;
  handleSearch: (query: string) => void;
  handleClearSearch: () => void;
  handleCharacterSelect: (characterId: number) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  loadCharacters: (page?: number) => void;
}

const CharactersContext = createContext<CharactersContextType | undefined>(
  undefined
);

export const useCharacters = () => {
  const context = useContext(CharactersContext);
  if (context === undefined) {
    throw new Error('useCharacters must be used within a CharactersProvider');
  }
  return context;
};

interface CharactersProviderProps {
  children: ReactNode;
}

export const CharactersProvider = ({ children }: CharactersProviderProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [pagination, setPagination] = useState<PaginationInfo>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
    currentPage: 1,
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 480);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Load characters
  const loadCharacters = useCallback(
    async (page: number = 1) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchCharacters(page, isMobile);
        setCharacters(result.characters);
        setPagination(result.pagination);

        // Select first character if none selected
        if (result.characters.length > 0 && !selectedCharacter) {
          setSelectedCharacter(result.characters[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    },
    [isMobile, selectedCharacter]
  );

  // Search characters
  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      setLoading(true);
      setError(null);

      try {
        if (query.trim()) {
          const result = await searchCharacters(query, 1, isMobile);
          setCharacters(result.characters);
          setPagination(result.pagination);

          // Select first character if none selected
          if (result.characters.length > 0) {
            setSelectedCharacter(result.characters[0]);
          }
        } else {
          await loadCharacters(1);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    },
    [isMobile, loadCharacters]
  );

  // Clear search
  const handleClearSearch = useCallback(async () => {
    setSearchQuery('');
    await loadCharacters(1);
  }, [loadCharacters]);

  // Select character
  const handleCharacterSelect = useCallback(
    async (characterId: number) => {
      const character = characters.find(char => char.id === characterId);
      if (character) {
        setSelectedCharacter(character);
      } else {
        // If character not in current list, fetch it
        try {
          const characterDetails = await fetchCharacterDetails(characterId);
          setSelectedCharacter(characterDetails);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Character not found');
        }
      }
    },
    [characters]
  );

  // Pagination handlers
  const handlePreviousPage = useCallback(async () => {
    if (pagination.currentPage > 1) {
      const newPage = pagination.currentPage - 1;
      setLoading(true);
      setError(null);

      try {
        if (searchQuery.trim()) {
          const result = await searchCharacters(searchQuery, newPage, isMobile);
          setCharacters(result.characters);
          setPagination(result.pagination);
        } else {
          await loadCharacters(newPage);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
  }, [pagination.currentPage, searchQuery, isMobile, loadCharacters]);

  const handleNextPage = useCallback(async () => {
    if (pagination.currentPage < pagination.pages) {
      const newPage = pagination.currentPage + 1;
      setLoading(true);
      setError(null);

      try {
        if (searchQuery.trim()) {
          const result = await searchCharacters(searchQuery, newPage, isMobile);
          setCharacters(result.characters);
          setPagination(result.pagination);
        } else {
          await loadCharacters(newPage);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
  }, [
    pagination.currentPage,
    pagination.pages,
    searchQuery,
    isMobile,
    loadCharacters,
  ]);

  // Load initial data
  useEffect(() => {
    if (characters.length === 0) {
      loadCharacters(1);
    }
  }, [characters.length, loadCharacters]);

  const value = {
    characters,
    selectedCharacter,
    pagination,
    searchQuery,
    error,
    loading,
    isMobile,
    handleSearch,
    handleClearSearch,
    handleCharacterSelect,
    handlePreviousPage,
    handleNextPage,
    loadCharacters,
  };

  return (
    <CharactersContext.Provider value={value}>
      {children}
    </CharactersContext.Provider>
  );
};
