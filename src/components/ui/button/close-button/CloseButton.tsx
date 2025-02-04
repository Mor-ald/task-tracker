import styles from './CloseButton.module.scss';

import CloseIcon from '../../icons/CloseIcon';
import { toggleSideBar } from '../../sidebar/SideBarSlice';
import { onClearTask } from '../../task-form/TaskFormSlice';

import { useAppDispatch } from '@/hooks/hooks';

/**
 * Close button component
 */
export default function CloseButton() {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(onClearTask());
    dispatch(toggleSideBar());
  };

  return (
    <div className={styles['button']} onClick={onClick}>
      <CloseIcon />
    </div>
  );
}
