import styles from './Badge.module.scss';
import IBadge from './IBadge';

/**
 * Badge component
 */
export default function Badge({ text, color }: IBadge) {
  return (
    <span className={`${styles['badge']}`} style={{ background: `${color}` }}>
      {text}
    </span>
  );
}
