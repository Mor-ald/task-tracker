import styles from './PlusButton.module.scss';

import PlusCircleIcon from '../../icons/PlusCircleIcon';
import { toggleSideBar } from '../../sidebar/SideBarSlice';

import { useAppDispatch } from '@/hooks/hooks';

/**
 * Plus button component
 */
export default function PlusButton() {
  const dispatch = useAppDispatch();
  return (
    <div className={styles['button']} onClick={() => dispatch(toggleSideBar())}>
      <PlusCircleIcon />
    </div>
  );
}
