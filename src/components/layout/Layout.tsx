import styles from './Layout.module.css';

import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles['layout']} data-testId={'layout'}>
      {children}
    </div>
  );
}
