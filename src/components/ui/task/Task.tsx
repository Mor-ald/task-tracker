import styles from './Task.module.scss';
import ITask from './ITask';

import Badge from '../badge/Badge';
import { onSetNewCurrentTitle, toggleSideBar } from '../sidebar/SideBarSlice';
import { onSetMode, onSetTask } from '../task-form/TaskFormSlice';

import { useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import { TaskPriority } from '@/types/Tasks';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

/**
 * Task component
 */
export default function Task({ taskData }: ITask) {
  const dispatch = useAppDispatch();
  const open = useAppSelector((store) => store.sidebar.open);
  const [dragging, setDragging] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ location, taskData }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [taskData]);

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
          ...taskData,
          deadline: taskData.deadline
            ? taskData.deadline.split('-').reverse().join('-')
            : taskData.deadline,
        }),
      );
      dispatch(toggleSideBar());
    }
  };

  return (
    <div
      className={styles[dragging ? 'task-dragging' : 'task']}
      ref={ref}
      onDoubleClick={onDoubleClick}
    >
      <div className={styles['task-header']}>
        <span className={styles['task-title']}>{taskData.title}</span>
        <Badge text={taskData.priority} color={getColor(taskData.priority)}></Badge>
      </div>
      <div className={styles['task-description']}>{taskData.description}</div>

      <div className={styles['task-created']}>
        <span>Создана:</span>
        <span>{taskData.created}</span>
      </div>

      {taskData.deadline && (
        <div className={styles['task-deadline']}>
          <span>Дедлайн:</span>
          <span>{taskData.deadline}</span>
        </div>
      )}

      {taskData.tags.length !== 0 && (
        <>
          <div className={styles['task-text']}>#Тэги</div>
          <div className={styles['task-tags']}>
            {taskData.tags.map((tag, i) => (
              <Badge key={i} text={tag.name} color={tag.color} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
