'use client';

import Image from 'next/image';

import { useFavorites } from '@/context/FavoritesContext';
import { Character } from '@/services/characterService';

import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: Character;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function CharacterCard({
  character,
  isSelected = false,
  onSelect,
}: CharacterCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isLiked = isFavorite(character.id);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card selection when clicking like button
    if (isLiked) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  const handleCardClick = () => {
    onSelect?.();
  };

  return (
    <div
      className={`${styles.characterCard} ${isSelected ? styles.characterCard_theme_selected : ''}`}
      onClick={handleCardClick}
    >
      <h3 className={styles.characterCard__name}>
        {character.name.toUpperCase()}
      </h3>

      <div className={styles.characterCard__imageContainer}>
        <Image
          src={character.image}
          alt={character.name}
          width={200}
          height={200}
          className={styles.characterCard__image}
          priority={false}
        />
      </div>

      <button
        onClick={handleLike}
        className={`${styles.characterCard__likeButton} ${isLiked ? styles.characterCard__likeButton_theme_liked : ''}`}
      >
        <Image
          src={isLiked ? '/likeRed.png' : '/likeWhite.png'}
          alt={isLiked ? 'Liked' : 'Like'}
          width={20}
          height={20}
        />
        Like
      </button>
    </div>
  );
}
