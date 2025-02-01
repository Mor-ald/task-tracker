import styles from './PlusButton.module.scss';

import PlusCircleIcon from '../../icons/PlusCircleIcon';

/**
 * Plus button component
 */
export default function PlusButton() {
  return (
    <div className={styles['button']}>
      <PlusCircleIcon />
    </div>
  );
}
