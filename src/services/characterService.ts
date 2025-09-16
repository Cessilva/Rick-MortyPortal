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

// Pagination info
export interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
  currentPage: number;
}

// JSON Server URL
const JSON_SERVER_URL = 'http://localhost:3001';

// Load all characters from JSON Server
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
    console.error('Error loading data:', error);
    throw new Error(
      'JSON Server not available. Please make sure to run: npm run json-server'
    );
  }
};

// Fetch characters with pagination
export const fetchCharacters = async (
  page: number,
  isMobile: boolean = false
): Promise<{
  characters: Character[];
  pagination: PaginationInfo;
}> => {
  try {
    const limit = isMobile ? 2 : 4;
    const allCharacters: Character[] = await loadLocalData();

    // Pagination
    const totalPages = Math.ceil(allCharacters.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCharacters = allCharacters.slice(startIndex, endIndex);

    // Generate pagination URLs
    const baseUrl = `${JSON_SERVER_URL}/characters`;
    const nextUrl =
      page < totalPages ? `${baseUrl}?_page=${page + 1}&_limit=${limit}` : null;
    const prevUrl =
      page > 1 ? `${baseUrl}?_page=${page - 1}&_limit=${limit}` : null;

    return {
      characters: paginatedCharacters,
      pagination: {
        count: allCharacters.length,
        pages: totalPages,
        next: nextUrl,
        prev: prevUrl,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

// Search characters by name
export const searchCharacters = async (
  query: string,
  page: number = 1,
  isMobile: boolean = false
): Promise<{
  characters: Character[];
  pagination: PaginationInfo;
}> => {
  try {
    const limit = isMobile ? 2 : 4;
    const allCharacters: Character[] = await loadLocalData();

    const filteredCharacters = allCharacters.filter(character => {
      const searchQuery = query.toLowerCase();
      return (
        character.name.toLowerCase().includes(searchQuery) ||
        character.status.toLowerCase().includes(searchQuery) ||
        character.type.toLowerCase().includes(searchQuery) ||
        character.gender.toLowerCase().includes(searchQuery)
      );
    });

    // Pagination
    const totalPages = Math.ceil(filteredCharacters.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCharacters = filteredCharacters.slice(startIndex, endIndex);

    // Generate pagination URLs
    const baseUrl = `${JSON_SERVER_URL}/characters`;
    const searchParam = query ? `?name_like=${encodeURIComponent(query)}` : '';
    const nextUrl =
      page < totalPages
        ? `${baseUrl}${searchParam}&_page=${page + 1}&_limit=${limit}`
        : null;
    const prevUrl =
      page > 1
        ? `${baseUrl}${searchParam}&_page=${page - 1}&_limit=${limit}`
        : null;

    return {
      characters: paginatedCharacters,
      pagination: {
        count: filteredCharacters.length,
        pages: totalPages,
        next: nextUrl,
        prev: prevUrl,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error('Error searching characters:', error);
    throw error;
  }
};

// Get character details by ID
export const fetchCharacterDetails = async (id: number): Promise<Character> => {
  try {
    const response = await fetch(`${JSON_SERVER_URL}/characters/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Character with ID ${id} not found`);
    }
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw error;
  }
};
