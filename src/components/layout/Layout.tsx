import styles from './Layout.module.scss';

import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles['layout']} data-testId={'layout'}>
      {children}
    </div>
  );
}
