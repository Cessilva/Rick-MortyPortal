'use client';

import Image from 'next/image';

import { useAppSelector } from '@/store/hooks';

import styles from './CharacterView.module.css';
import StatusBadge from './StatusBadge';

export default function CharacterView() {
  const { selectedCharacter, characters } = useAppSelector(
    state => state.characters
  );

  const displayCharacter = selectedCharacter || characters[0];

  if (!displayCharacter) {
    return null;
  }

  return (
    <div className={styles.characterView}>
      <div className={styles.characterView__container}>
        <div className={styles.characterView__imageContainer}>
          <Image
            src={displayCharacter.image}
            alt={displayCharacter.name}
            width={400}
            height={500}
            className={styles.characterView__image}
            priority
          />

          <StatusBadge status={displayCharacter.status} />
        </div>

        <div className={styles.characterView__infoContainer}>
          <div className={styles.characterView__topInfo}>
            <h1 className={styles.characterView__name}>
              {displayCharacter.name.toUpperCase()}
            </h1>
            <div className={styles.characterView__speciesType}>
              <span className={styles.characterView__species}>
                {displayCharacter.species}
              </span>
              <span className={styles.characterView__type}>
                {displayCharacter.type || 'Unknown'}
              </span>
            </div>
          </div>

          <div className={styles.characterView__details}>
            <div className={styles.characterView__detailItem}>
              <span className={styles.characterView__detailLabel}>Origin:</span>
              <span className={styles.characterView__detailValue}>
                {displayCharacter.origin.name}
              </span>
            </div>
            <div className={styles.characterView__detailItem}>
              <span className={styles.characterView__detailLabel}>
                Location:
              </span>
              <span className={styles.characterView__detailValue}>
                {displayCharacter.location.name}
              </span>
            </div>
            <div className={styles.characterView__detailItem}>
              <span className={styles.characterView__detailLabel}>Gender:</span>
              <span className={styles.characterView__detailValue}>
                {displayCharacter.gender}
              </span>
            </div>
            <div className={styles.characterView__detailItem}>
              <span className={styles.characterView__detailLabel}>
                Episodes:
              </span>
              <span className={styles.characterView__detailValue}>
                {displayCharacter.episode.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
