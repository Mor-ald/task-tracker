import styles from './Container.module.scss';

import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className={styles['container']} data-testId={'container'}>
      {children}
    </div>
  );
}
