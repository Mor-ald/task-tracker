import styles from './PlusButton.module.scss';

import PlusCircleIcon from '../../icons/PlusCircleIcon';
import { onSetNewCurrentTitle, toggleSideBar } from '../../sidebar/SideBarSlice';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

/**
 * Plus button component
 */
export default function PlusButton() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((store) => store.sidebar.open);

  const onClick = () => {
    if (!open) {
      dispatch(onSetNewCurrentTitle({ title: 'Новая задача' }));
      dispatch(toggleSideBar());
    }
  };

  return (
    <div className={styles['button']} onClick={onClick}>
      <PlusCircleIcon />
    </div>
  );
}
