import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Character interface
export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// API Response
export interface CharacterApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

// Character state
interface CharacterState {
  characters: Character[];
  error: string | null;
  pagination: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
    currentPage: number;
  };
  searchQuery: string;
  selectedCharacter: Character | null;
}

// Initial state
const initialState: CharacterState = {
  characters: [],
  error: null,
  pagination: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
    currentPage: 1,
  },
  searchQuery: '',
  selectedCharacter: null,
};

// Character slice
const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Character operations
    fetchCharacters: (
      state,
      _action: PayloadAction<{ page?: number; filters?: unknown }>
    ) => {
      state.error = null;
    },

    setCharacters: (
      state,
      action: PayloadAction<{
        characters: Character[];
        pagination: CharacterState['pagination'];
      }>
    ) => {
      state.characters = action.payload.characters;
      state.pagination = action.payload.pagination;
      state.error = null;
    },

    searchCharacters: (
      state,
      _action: PayloadAction<{ page?: number; searchQuery?: string }>
    ) => {
      state.error = null;
    },

    // Search and filter actions
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    clearSearch: state => {
      state.searchQuery = '';
    },

    // Character selection actions
    setSelectedCharacter: (state, action: PayloadAction<Character | null>) => {
      state.selectedCharacter = action.payload;
    },

    clearSelectedCharacter: state => {
      state.selectedCharacter = null;
    },
  },
});

// Export actions
export const {
  setError,
  fetchCharacters,
  setCharacters,
  searchCharacters,
  setSearchQuery,
  clearSearch,
  setSelectedCharacter,
  clearSelectedCharacter,
} = characterSlice.actions;

export default characterSlice.reducer;
