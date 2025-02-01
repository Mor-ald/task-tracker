import { Tasks } from '@/types/Tasks';

/**
 * Tab component props
 */
export default interface ITab {
  title: string;
  data: Tasks;
  createTaskButtonVisible: boolean;
}
