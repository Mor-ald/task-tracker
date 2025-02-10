import {
  onAddNewTag,
  onChangeDeadLine,
  onChangeDescription,
  onChangePriority,
  onChangeTagName,
  onChangeTitle,
  onChangeType,
  onClearTask,
  onPickTagColor,
  onRemoveTag,
} from './TaskFormSlice';
import styles from './TaskForm.module.scss';

import CloseIcon from '../icons/CloseIcon';
import { toggleSideBar } from '../sidebar/SideBarSlice';

import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useAddTaskMutation, useUpdateTaskMutation } from '@/services/api/tasksApi';
import createDate from '@/utils/createDate';

export default function TaskForm() {
  const dispatch = useAppDispatch();
  const { mode, task, currentTagToAdd } = useAppSelector((store) => store.formTask);
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const minDeadLineDate = createDate(new Date()).split('-').reverse().join('-');

  const addNewTask = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      addTask({
        title: task.title,
        description: task.description,
        type: task.type,
        status: task.status,
        created: task.created ? task.created : createDate(new Date()),
        deadline: task.deadline ? task.deadline.split('-').reverse().join('-') : null,
        priority: task.priority,
        tags: task.tags,
      });

      dispatch(onClearTask());
      dispatch(toggleSideBar());
    },
    [addTask, dispatch, task],
  );

  const updateCurrentTask = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      updateTask({
        id: task.id,
        title: task.title,
        description: task.description,
        type: task.type,
        status: task.status,
        created: task.created,
        deadline: task.deadline ? task.deadline.split('-').reverse().join('-') : null,
        priority: task.priority,
        tags: task.tags,
      });

      dispatch(onClearTask());
      dispatch(toggleSideBar());
    },
    [dispatch, task, updateTask],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (mode === 'add') return addNewTask(e);
      if (mode === 'edit') return updateCurrentTask(e);
    },
    [addNewTask, mode, updateCurrentTask],
  );

  const addNewTag = useCallback(() => {
    if (currentTagToAdd.name && task.tags.length < 11) {
      dispatch(onAddNewTag({ name: currentTagToAdd.name, color: currentTagToAdd.color }));
    }
  }, [currentTagToAdd.color, currentTagToAdd.name, dispatch, task.tags.length]);

  const Tags = useCallback(() => {
    return (
      <div className={styles['task-tags']}>
        {task.tags.map((tag, i) => (
          <span key={tag.name + i} className={styles['tag']} style={{ background: tag.color }}>
            <span>{tag.name}</span>
            <span
              className={styles['tag-close']}
              style={{ filter: 'invert(100%)' }}
              data-testid="tag-close"
              onClick={() => dispatch(onRemoveTag({ name: tag.name }))}
            >
              <CloseIcon />
            </span>
          </span>
        ))}
      </div>
    );
  }, [dispatch, task.tags]);

  return (
    <div className={styles['task-form']} data-testid="task-form">
      <form data-testid="form" onSubmit={onSubmit}>
        <div>
          <div className={styles['task-block']}>
            <label htmlFor="task-title">Название задачи</label>
            <input
              id="task-title"
              type="text"
              required
              placeholder="Тестовая задача"
              value={task.title}
              onChange={(e) => dispatch(onChangeTitle({ title: e.target.value }))}
            />
          </div>

          <div className={styles['task-block']}>
            <label htmlFor="task-description">Описание задачи</label>
            <textarea
              id="task-description"
              rows={5}
              placeholder="Описание вашей прекрасной задачи"
              value={task.description}
              onChange={(e) => dispatch(onChangeDescription({ description: e.target.value }))}
            />
          </div>

          <div className={styles['task-block']}>
            <label htmlFor="task-type">Тип задачи</label>
            <select
              id="task-type"
              required
              value={task.type}
              data-testid="task-type-select"
              onChange={(e) => dispatch(onChangeType({ type: e.target.value }))}
            >
              <option value={'task'}>Задача</option>
              <option value={'refactor'}>Рефакторинг</option>
              <option value={'feature'}>Новая возможность</option>
              <option value={'error'}>Ошибка</option>
              <option value={'improvement'}>Улучшение</option>
            </select>
          </div>

          <div className={styles['task-block']}>
            <label htmlFor="task-priority">Приоритет задачи</label>
            <select
              id="task-priority"
              required
              value={task.priority}
              data-testid="task-priority-select"
              onChange={(e) => dispatch(onChangePriority({ priority: e.target.value }))}
            >
              <option value={'low'}>Низкая</option>
              <option value={'medium'}>Средняя</option>
              <option value={'hard'}>Высокая</option>
            </select>
          </div>

          <div className={styles['task-block']}>
            <label htmlFor="task-deadline">Дедлайн</label>
            <input
              id="task-deadline"
              type="date"
              placeholder="01-01-2025"
              min={minDeadLineDate}
              value={task.deadline!}
              onChange={(e) => dispatch(onChangeDeadLine({ deadline: e.target.value }))}
            />
          </div>

          <div className={styles['task-block-tags']}>
            <span>#Тэги</span>
            <Tags />
            <div>
              <div className={styles['task-block']}>
                <label htmlFor="task-tag-name">Название</label>
                <input
                  id="task-tag-name"
                  type="text"
                  placeholder="#Тэг"
                  maxLength={20}
                  value={currentTagToAdd.name}
                  onChange={(e) => dispatch(onChangeTagName({ name: e.target.value }))}
                />
              </div>
              <div className={styles['task-block']}>
                <label htmlFor="task-tag-name">Цвет</label>
                <input
                  id="task-tag-name"
                  type="color"
                  className={styles['task-pick-color']}
                  data-testid="task-tag-name"
                  value={currentTagToAdd.color}
                  onChange={(e) => dispatch(onPickTagColor({ color: e.target.value }))}
                />
              </div>
              <div className={styles['task-block']}>
                <label htmlFor="task-add-tag-button">Добавить</label>
                <span
                  id="task-add-tag-button"
                  className={styles['task-block-add-tag']}
                  onClick={addNewTag}
                >
                  +
                </span>
              </div>
            </div>
          </div>
        </div>

        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}
