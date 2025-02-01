import styles from './Task.module.scss';
import ITask from './ITask';

import Badge from '../badge/Badge';

import { TaskPriority } from '@/types/Tasks';

/**
 * Task component
 */
export default function Task({ taskData }: ITask) {
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
  return (
    <div className={styles['task']}>
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

      {taskData.tags.length && (
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
