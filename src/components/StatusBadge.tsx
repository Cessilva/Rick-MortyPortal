import React from 'react';

import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return styles['statusBadge--alive'];
      case 'dead':
        return styles['statusBadge--dead'];
      case 'unknown':
        return styles['statusBadge--unknown'];
      default:
        return styles['statusBadge--alive'];
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'VIVO';
      case 'dead':
        return 'MUERTO';
      case 'unknown':
        return 'UNKNOWN';
      default:
        return 'VIVO';
    }
  };

  return (
    <div
      className={`${styles.statusBadge} ${getStatusClass(status)} ${className}`}
    >
      <div className={styles.statusBadge__indicator}></div>
      <span className={styles.statusBadge__text}>{getStatusText(status)}</span>
    </div>
  );
};

export default StatusBadge;
