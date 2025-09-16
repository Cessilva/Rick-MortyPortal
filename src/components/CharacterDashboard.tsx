'use client';

import { useCharacters } from '@/context/CharactersContext';
import { Character } from '@/services/characterService';

import styles from './CharacterDashboard.module.css';
import CharacterList from './CharacterList';
import CharacterView from './CharacterView';
import FavoritesTab from './FavoritesTab';

export default function CharacterDashboard() {
  const { handleCharacterSelect } = useCharacters();

  const handleFavoriteSelect = (character: Character) => {
    handleCharacterSelect(character.id);
  };

  return (
    <div className={styles.characterDashboard}>
      <div className={styles.characterDashboard__mainContent}>
        <div className={styles.characterDashboard__characterViewContainer}>
          <CharacterView />
        </div>
        <div className={styles.characterDashboard__characterListContainer}>
          <CharacterList />
        </div>
      </div>
      <div className={styles.characterDashboard__favoritesContainer}>
        <FavoritesTab onCharacterSelect={handleFavoriteSelect} />
      </div>
    </div>
  );
}
