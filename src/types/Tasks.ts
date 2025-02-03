/**
 * Status of tasks
 */
export type TaskStatus = 'to-do' | 'in-progress' | 'test' | 'closed';

/**
 * Types of tasks
 */
export type TaskType = 'task' | 'refactor' | 'feature' | 'error' | 'improvement';

/**
 * Priorities of tasks
 */
export type TaskPriority = 'low' | 'medium' | 'hard';

/**
 * Task's data
 */
export type Task = {
  id: string | number;
  title: string;
  description: string;
  status: TaskStatus;
  type: TaskType;
  priority: TaskPriority;
  created: string;
  deadline: string | null;
  tags: {
    name: string;
    color: string;
  }[];
};

/**
 * Tasks api data
 */
export type Tasks = Task[];
