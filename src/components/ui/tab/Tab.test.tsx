import '@testing-library/jest-dom';

import Tab from './Tab';

import * as taskApi from '../../../services/api/tasksApi';
import * as hooks from '../../../hooks/hooks';

import { render, screen, waitFor } from '@testing-library/react';

jest.mock('../../../services/api/tasksApi', () => ({
  useGetTaskByStatusQuery: jest.fn(),
  useUpdateStatusTaskMutation: jest.fn(),
}));

jest.mock('@/hooks/hooks');
const mockedUseAppSelector = jest.spyOn(hooks, 'useAppSelector');
const mockedUseAppDispatch = jest.spyOn(hooks, 'useAppDispatch');

const mockData = {
  title: 'API списка доступных клиентов',
  description: '.../api/v1/auth/getclients',
  type: 'task',
  status: 'to-do',
  created: '04-02-2025',
  deadline: '06-02-2025',
  priority: 'low',
  tags: [
    {
      name: 'API',
      color: '#000000',
    },
    {
      name: 'Клиенты',
      color: '#00ff04',
    },
  ],
  id: '3370',
};

describe('Tab', () => {
  const mockUpdateStatus = jest.fn();

  beforeEach(() => {
    const dispatch = jest.fn();
    mockedUseAppSelector.mockReturnValue(false);
    mockedUseAppDispatch.mockReturnValue(dispatch);

    (taskApi.useUpdateStatusTaskMutation as jest.Mock).mockReturnValue([mockUpdateStatus]);
    (taskApi.useGetTaskByStatusQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders correctly tab title and buttons', () => {
    render(<Tab title="Test title" status="to-do" createTaskButtonVisible={true} />);

    const tabTitle = screen.getByText('Test title');
    const plusButton = screen.getByTestId('plus-button');
    const menuButton = screen.getByTestId('menu-button');

    expect(tabTitle).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();
    expect(menuButton).toBeInTheDocument();
  });

  it('does not render plus button when createTaskButtonVisible is false', () => {
    render(<Tab title="To Do" status={'in-progress'} createTaskButtonVisible={false} />);

    const menuButton = screen.getByTestId('menu-button');

    expect(screen.queryByTestId('plus-button')).not.toBeInTheDocument();
    expect(menuButton).toBeInTheDocument();
  });

  it('shows loading state and renders tasks when loaded', async () => {
    (taskApi.useGetTaskByStatusQuery as jest.Mock)
      .mockReturnValueOnce({ data: [], isLoading: true })
      .mockReturnValueOnce({ data: [mockData], isLoading: false });

    const { rerender } = render(
      <Tab title="To Do" status={'to-do'} createTaskButtonVisible={true} />,
    );

    expect(screen.queryByTestId('tab-content')).not.toBeInTheDocument();

    rerender(<Tab title="To Do" status={'to-do'} createTaskButtonVisible={true} />);

    await waitFor(() => {
      expect(screen.getByTestId('tab-content')).toBeInTheDocument();
      expect(screen.getByText(mockData.title)).toBeInTheDocument();
    });
  });
});
