import styles from './Tab.module.scss';
import ITab from './ITab';

import Container from '../container/Container';
import TaskCard from '../task/Task';
import PlusButton from '../button/plus-button/PlusButton';
import MenuButton from '../button/menu-button/MenuButton';

import { useCallback, useEffect, useRef } from 'react';
import invariant from 'tiny-invariant';
import {
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import type { Task, TaskStatus } from '@/types/Tasks';

import { useGetTaskByStatusQuery, useUpdateStatusTaskMutation } from '@/services/api/tasksApi';

/**
 * Tab component
 */
export default function Tab({ title, status, createTaskButtonVisible }: ITab) {
  const { data, isLoading } = useGetTaskByStatusQuery(status);
  const [updateStatus] = useUpdateStatusTaskMutation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ status }),
    });
  }, [status]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        if (!location.current.dropTargets[0]) return;

        const destinationStatus = location.current.dropTargets[0].data.status as TaskStatus;

        updateStatus({
          id: (source.data.taskData as Task).id,
          status: destinationStatus,
        });
      },
    });
  }, [status, updateStatus]);

  const TabTitle = () => {
    return (
      <div className={styles['tab-title']} ref={ref}>
        <div>{title}</div>
        <div className={styles['tab-buttons']}>
          {createTaskButtonVisible && <PlusButton />}
          <MenuButton />
        </div>
      </div>
    );
  };

  const Tasks = useCallback(() => {
    if (!isLoading)
      return (
        <div className={styles['tab-content']}>
          {data && data.map((task) => <TaskCard taskData={task} />)}
        </div>
      );

    return <></>;
  }, [data, isLoading]);

  return (
    <Container>
      <div className={styles['tab']} ref={ref}>
        <TabTitle />
        <Tasks />
      </div>
    </Container>
  );
}
