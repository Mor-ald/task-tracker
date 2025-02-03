import styles from './SideBar.module.scss';

import CloseButton from '../button/close-button/CloseButton';

import { ReactNode } from 'react';

import { useAppSelector } from '@/hooks/hooks';

/**
 * SideBar component
 */
export default function Sidebar({ children }: { children: ReactNode }) {
  const isOpen = useAppSelector((store) => store.sidebar.open);

  return (
    <div
      className={styles['sidebar']}
      style={{ transform: isOpen ? `translateX(${0})` : `translateX(${500}px)` }}
    >
      <div className={styles['sidebar-title']}>
        <h3>Новая задача</h3>
        <CloseButton />
      </div>
      <div className={styles['sidebar-content']}>{children}</div>
    </div>
  );
}
