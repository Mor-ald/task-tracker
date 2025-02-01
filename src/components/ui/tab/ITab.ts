import { TaskStatus } from '@/types/Tasks';

/**
 * Tab component props
 */
export default interface ITab {
  title: string;
  status: TaskStatus;
  createTaskButtonVisible: boolean;
}
