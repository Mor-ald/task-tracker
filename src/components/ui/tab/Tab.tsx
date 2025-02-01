import styles from './Tab.module.scss';
import ITab from './ITab';

import Container from '../container/Container';

/**
 * Tab component
 */
export default function Tab({ title, data, createTaskButtonVisible }: ITab) {
  return (
    <Container>
      <div className={styles['tab-title']}>
        <div>{title}</div>
        <div></div>
      </div>
      <div className={styles['tab-content']}></div>
    </Container>
  );
}
