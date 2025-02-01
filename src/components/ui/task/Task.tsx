import styles from './Task.module.scss';
import ITask from './ITask';

import Badge from '../badge/Badge';

/**
 * Task component
 */
export default function Task({ taskData }: ITask) {
  return (
    <div className={styles['task']}>
      <div className={styles['task-header']}>
        <span className={styles['task-title']}>{taskData.title}</span>

        <div className={styles['task-priority']}>{taskData.description}</div>

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

        {taskData.tags.length &&
          taskData.tags.map((tag, i) => <Badge key={i} text={tag.name} color={tag.color} />)}
      </div>
    </div>
  );
}
