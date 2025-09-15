import { call, put, takeLatest } from 'redux-saga/effects';

import {
  Character,
  CharacterApiResponse,
  fetchCharacters,
  setCharacters,
  searchCharacters,
} from '../slices/characterSlice';
// JSON Server
const JSON_SERVER_URL = 'http://localhost:3001';

const loadLocalData = async (): Promise<Character[]> => {
  try {
    const response = await fetch(`${JSON_SERVER_URL}/characters`);
    if (response.ok) {
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error loading data :', error);
    throw new Error(
      'JSON Server not available. Please make sure to run: npm run json-server'
    );
  }
};

function* fetchCharactersSaga(action: {
  payload: { page?: number; filters?: unknown };
}) {
  try {
    const page = action.payload?.page || 1;
    const allCharacters: Character[] = yield call(loadLocalData);
    // Pagination
    const itemsPerPage = 4;
    const totalPages = Math.ceil(allCharacters.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCharacters = allCharacters.slice(startIndex, endIndex);
    // Generate pagination URLs
    const baseUrl = `${JSON_SERVER_URL}/characters`;
    const nextUrl =
      page < totalPages
        ? `${baseUrl}?_page=${page + 1}&_limit=${itemsPerPage}`
        : null;
    const prevUrl =
      page > 1 ? `${baseUrl}?_page=${page - 1}&_limit=${itemsPerPage}` : null;

    const response: CharacterApiResponse = {
      info: {
        count: allCharacters.length,
        pages: totalPages,
        next: nextUrl,
        prev: prevUrl,
      },
      results: paginatedCharacters,
    };

    yield put(
      setCharacters({
        characters: response.results,
        pagination: {
          count: response.info.count,
          pages: response.info.pages,
          next: response.info.next,
          prev: response.info.prev,
          currentPage: page,
        },
      })
    );
  } catch (error: unknown) {
    yield put({
      type: 'characters/setError',
      payload: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

function* searchCharactersSaga(action: {
  payload: { page?: number; searchQuery?: string };
}) {
  try {
    const page = action.payload?.page || 1;
    const searchQuery = action.payload?.searchQuery || '';

    const allCharacters: Character[] = yield call(loadLocalData);

    const filteredCharacters = allCharacters.filter(character => {
      const query = searchQuery.toLowerCase();
      return (
        character.name.toLowerCase().includes(query) ||
        character.status.toLowerCase().includes(query) ||
        character.type.toLowerCase().includes(query) ||
        character.gender.toLowerCase().includes(query)
      );
    });

    // Pagination
    const itemsPerPage = 4;
    const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCharacters = filteredCharacters.slice(startIndex, endIndex);

    // Generate pagination URLs
    const baseUrl = `${JSON_SERVER_URL}/characters`;
    const searchParam = searchQuery
      ? `?name_like=${encodeURIComponent(searchQuery)}`
      : '';
    const baseQuery = searchParam;

    const nextUrl =
      page < totalPages
        ? `${baseUrl}${baseQuery}&_page=${page + 1}&_limit=${itemsPerPage}`
        : null;
    const prevUrl =
      page > 1
        ? `${baseUrl}${baseQuery}&_page=${page - 1}&_limit=${itemsPerPage}`
        : null;

    const response: CharacterApiResponse = {
      info: {
        count: filteredCharacters.length,
        pages: totalPages,
        next: nextUrl,
        prev: prevUrl,
      },
      results: paginatedCharacters,
    };

    yield put(
      setCharacters({
        characters: response.results,
        pagination: {
          count: response.info.count,
          pages: response.info.pages,
          next: response.info.next,
          prev: response.info.prev,
          currentPage: page,
        },
      })
    );
  } catch (error: unknown) {
    yield put({
      type: 'characters/setError',
      payload: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export function* characterSaga() {
  yield takeLatest(fetchCharacters, fetchCharactersSaga);
  yield takeLatest(searchCharacters, searchCharactersSaga);
}
