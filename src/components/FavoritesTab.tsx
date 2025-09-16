'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

import { useFavorites } from '@/context/FavoritesContext';
import { Character } from '@/services/characterService';

import styles from './FavoritesTab.module.css';

interface FavoritesTabProps {
  onCharacterSelect?: (character: Character) => void;
}

export default function FavoritesTab({ onCharacterSelect }: FavoritesTabProps) {
  const { favorites, removeFavorite } = useFavorites();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCharacterClick = (character: Character) => {
    onCharacterSelect?.(character);
    setIsOpen(false);
  };

  const handleRemoveFavorite = (
    characterId: number,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    removeFavorite(characterId);
  };

  return (
    <div className={styles.favoritesTabContainer} ref={dropdownRef}>
      <button
        className={styles.favoritesTab}
        onClick={() => setIsOpen(!isOpen)}
      >
        FAVS {favorites.length > 0 && `(${favorites.length})`}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownContent}>
            {favorites.length > 0 ? (
              favorites.map(character => (
                <div
                  key={character.id}
                  className={styles.favoriteItem}
                  onClick={() => handleCharacterClick(character)}
                >
                  <div className={styles.characterImageContainer}>
                    <Image
                      src={character.image}
                      alt={character.name}
                      width={40}
                      height={40}
                      className={styles.characterImage}
                    />
                  </div>
                  <div className={styles.characterInfo}>
                    <span className={styles.characterName}>
                      {character.name.toUpperCase()}
                    </span>
                    <span className={styles.characterStatus}>
                      {character.status}
                    </span>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={e => handleRemoveFavorite(character.id, e)}
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <span>No hay favoritos</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
