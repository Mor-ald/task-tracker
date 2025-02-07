import styles from './TaskCard.module.scss';
import ITaskCard from './ITaskCard';

import Badge from '../badge/Badge';
import { onSetNewCurrentTitle, toggleSideBar } from '../sidebar/SideBarSlice';
import { onSetMode, onSetTask } from '../task-form/TaskFormSlice';

import { useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import { TaskPriority } from '@/types/Tasks';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

/**
 * TaskCard component
 */
export default function TaskCard({ data }: ITaskCard) {
  const dispatch = useAppDispatch();
  const open = useAppSelector((store) => store.sidebar.open);
  const [dragging, setDragging] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ location, data }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [data]);

  const getColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'low':
        return '#67cb65';
      case 'medium':
        return '#ff9533';
      case 'hard':
        return '#e74444';
      default:
        return '#67cb65';
    }
  };

  const onDoubleClick = () => {
    if (!open) {
      dispatch(onSetMode({ mode: 'edit' }));
      dispatch(onSetNewCurrentTitle({ title: 'Редактирование задачи' }));
      dispatch(
        onSetTask({
          ...data,
          deadline: data.deadline ? data.deadline.split('-').reverse().join('-') : data.deadline,
        }),
      );
      dispatch(toggleSideBar());
    }
  };

  return (
    <div
      className={styles[dragging ? 'task-dragging' : 'task']}
      ref={ref}
      data-testid="task-card"
      onDoubleClick={onDoubleClick}
    >
      <div className={styles['task-header']}>
        <span className={styles['task-title']}>{data.title}</span>
        <Badge text={data.priority} color={getColor(data.priority)}></Badge>
      </div>
      <div className={styles['task-description']}>{data.description}</div>

      <div className={styles['task-created']}>
        <span>Создана:</span>
        <span>{data.created}</span>
      </div>

      {data.deadline && (
        <div className={styles['task-deadline']}>
          <span>Дедлайн:</span>
          <span>{data.deadline}</span>
        </div>
      )}

      {data.tags.length !== 0 && (
        <>
          <div className={styles['task-text']}>#Тэги</div>
          <div className={styles['task-tags']}>
            {data.tags.map((tag, i) => (
              <Badge key={i} text={tag.name} color={tag.color} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
