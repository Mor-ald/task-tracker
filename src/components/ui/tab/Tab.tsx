import styles from './Tab.module.scss';
import ITab from './ITab';

import Container from '../container/Container';
import Task from '../task/Task';
import PlusButton from '../button/plus-button/PlusButton';
import MenuButton from '../button/menu-button/MenuButton';

import { useGetTaskByStatusQuery } from '@/services/api/tasksApi';

/**
 * Tab component
 */
export default function Tab({ title, status, createTaskButtonVisible }: ITab) {
  const { data, isLoading } = useGetTaskByStatusQuery(status);

  return (
    <div className={styles['tab']}>
      <Container>
        <div className={styles['tab-title']}>
          <div>{title}</div>
          <div className={styles['tab-buttons']}>
            {createTaskButtonVisible && <PlusButton />}
            {<MenuButton />}
          </div>
        </div>
        {!isLoading && (
          <div className={styles['tab-content']}>
            {data && data.map((task) => <Task taskData={task} />)}
          </div>
        )}
      </Container>
    </div>
  );
}
