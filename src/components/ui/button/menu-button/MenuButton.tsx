import styles from './MenuButton.module.scss';

import MenuCircleIcon from '../../icons/MenuCircleIcon';

/**
 * Menu button component
 */
export default function MenuButton() {
  return (
    <div className={styles['button']} data-testid="menu-button">
      <MenuCircleIcon />
    </div>
  );
}
