import styles from './CloseButton.module.scss';

import CloseIcon from '../../icons/CloseIcon';
import { toggleSideBar } from '../../sidebar/SideBarSlice';

import { useAppDispatch } from '@/hooks/hooks';

/**
 * Close button component
 */
export default function CloseButton() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles['button']} onClick={() => dispatch(toggleSideBar())}>
      <CloseIcon />
    </div>
  );
}
