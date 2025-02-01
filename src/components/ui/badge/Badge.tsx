import styles from './Badge.module.scss';
import IBadge from './IBadge';

/**
 * Badge component
 */
export default function Badge({ text, type }: IBadge) {
  const colors = {
    error: 'badge-error',
    info: 'badge-info',
    secondary: 'badge-secondary',
    warning: 'badge-warning',
    success: 'badge-success',
  };

  return <span className={`${styles['badge']} ${styles[colors[type]]}`}>{text}</span>;
}
