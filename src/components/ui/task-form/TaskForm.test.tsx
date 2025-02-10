import '@testing-library/jest-dom';

import TaskForm from './TaskForm';
import * as taskFormActions from './TaskFormSlice';

import * as sideBarActions from '../sidebar/SideBarSlice';
import * as hooks from '../../../hooks/hooks';
import * as taskApi from '../../../services/api/tasksApi';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import createDate from '@/utils/createDate';
import { Task } from '@/types/Tasks';

jest.mock('../../../services/api/tasksApi', () => ({
  useAddTaskMutation: jest.fn(),
  useUpdateTaskMutation: jest.fn(),
}));

jest.mock('@/hooks/hooks');

interface FormTaskData {
  mode: 'add' | 'edit';
  task: Task;
  currentTagToAdd: { name: string; color: string };
}

const mockedUseAppSelector = jest.spyOn(hooks, 'useAppSelector');
const mockedUseAppDispatch = jest.spyOn(hooks, 'useAppDispatch');

const initialState: FormTaskData = {
  mode: 'add',
  task: {
    title: '',
    description: '',
    type: 'task',
    status: 'to-do',
    created: createDate(new Date()),
    deadline: null,
    priority: 'low',
    tags: [],
    id: '',
  },
  currentTagToAdd: { name: '', color: '#000000' },
};

describe('TaskForm', () => {
  const mockAddTask = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (taskApi.useAddTaskMutation as jest.Mock).mockReturnValue([mockAddTask]);
    (taskApi.useUpdateTaskMutation as jest.Mock).mockReturnValue([mockUpdateTask]);
  });

  describe('Form components', () => {
    const mockState = Object.assign({}, initialState);

    beforeEach(() => {
      mockedUseAppSelector.mockReturnValue(mockState);
      mockedUseAppDispatch.mockReturnValue(mockDispatch);

      mockDispatch.mockImplementation((action) => {
        switch (action.type) {
          case 'taskForm/onChangeTitle':
            return (mockState.task.title += action.payload.title);
          case 'taskForm/onChangeDescription':
            return (mockState.task.description += action.payload.description);
          case 'taskForm/onChangeType':
            return (mockState.task.type = action.payload.type);
          case 'taskForm/onChangePriority':
            return (mockState.task.priority = action.payload.priority);
          case 'taskForm/onChangeDeadLine':
            return (mockState.task.deadline = action.payload.deadline);
          case 'taskForm/onChangeTagName':
            return (mockState.currentTagToAdd.name += action.payload.name);
          case 'taskForm/onPickTagColor':
            return (mockState.currentTagToAdd.color = action.payload.color);
          case 'taskForm/onAddNewTag':
            mockState.task.tags = [
              ...mockState.task.tags,
              { name: mockState.currentTagToAdd.name, color: mockState.currentTagToAdd.color },
            ];
            mockState.currentTagToAdd.name = '';
            mockState.currentTagToAdd.color = '#000000';
            return;
          case 'taskForm/onRemoveTag':
            return (mockState.task.tags = mockState.task.tags.filter(
              (tag) => tag.name !== action.payload.name,
            ));
          case 'taskForm/onClearTask':
            return (mockState.task = {
              title: '',
              description: '',
              type: 'task',
              status: 'to-do',
              created: createDate(new Date()),
              deadline: '',
              priority: 'low',
              tags: [],
              id: '',
            });
        }
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Renders correctly', () => {
      render(<TaskForm />);

      const taskFormElement = screen.getByTestId('task-form');
      const form = screen.getByTestId('form');
      const taskTitleInput = screen.getByPlaceholderText('Тестовая задача');
      const taskDescriptionInput = screen.getByPlaceholderText('Описание вашей прекрасной задачи');
      const taskTypeSelect = screen.getByTestId('task-type-select');
      const taskPrioritySelect = screen.getByTestId('task-priority-select');
      const taskDeadLineInput = screen.getByPlaceholderText('01-01-2025');
      const taskTagNameInput = screen.getByPlaceholderText('#Тэг');
      const taskPickColorInput = screen.getByTestId('task-tag-name');
      const addTagButton = screen.getByText('+');
      const saveButton = screen.getByRole('button');

      expect(taskFormElement).toBeInTheDocument();
      expect(form).toBeInTheDocument();
      expect(taskTitleInput).toBeInTheDocument();
      expect(taskDescriptionInput).toBeInTheDocument();
      expect(taskTypeSelect).toBeInTheDocument();
      expect(taskPrioritySelect).toBeInTheDocument();
      expect(taskDeadLineInput).toBeInTheDocument();
      expect(taskTagNameInput).toBeInTheDocument();
      expect(taskPickColorInput).toBeInTheDocument();
      expect(addTagButton).toBeInTheDocument();
      expect(saveButton).toBeInTheDocument();
    });

    it('Change title value', async () => {
      const { rerender } = render(<TaskForm />);
      const mockedOnChangeTitle = jest.spyOn(taskFormActions, 'onChangeTitle');

      const user = userEvent.setup();
      const taskTitleInput: HTMLInputElement = screen.getByPlaceholderText('Тестовая задача');

      await user.type(taskTitleInput, 'New title');

      rerender(<TaskForm />);

      expect(taskTitleInput).toHaveValue('New title');
      expect(mockedOnChangeTitle).toHaveBeenCalledTimes(9);
    });

    it('Change description value', async () => {
      const { rerender } = render(<TaskForm />);
      const mockedOnChangeDescription = jest.spyOn(taskFormActions, 'onChangeDescription');

      const user = userEvent.setup();
      const taskDescriptionInput = screen.getByPlaceholderText('Описание вашей прекрасной задачи');

      await user.type(taskDescriptionInput, 'New desc');

      rerender(<TaskForm />);

      expect(taskDescriptionInput).toHaveValue('New desc');
      expect(mockedOnChangeDescription).toHaveBeenCalledTimes(8);
    });

    it('Select other type', async () => {
      const { rerender } = render(<TaskForm />);
      const mockedOnChangeType = jest.spyOn(taskFormActions, 'onChangeType');

      const user = userEvent.setup();
      const taskTypeSelect = screen.getByTestId('task-type-select');

      await user.selectOptions(taskTypeSelect, 'refactor');

      rerender(<TaskForm />);

      expect(taskTypeSelect).toHaveValue('refactor');
      expect(mockedOnChangeType).toHaveBeenCalledTimes(1);
    });

    it('Select other priority', async () => {
      const { rerender } = render(<TaskForm />);
      const mockedOnChangePriority = jest.spyOn(taskFormActions, 'onChangePriority');

      const user = userEvent.setup();
      const taskPrioritySelect = screen.getByTestId('task-priority-select');

      await user.selectOptions(taskPrioritySelect, 'medium');

      rerender(<TaskForm />);

      expect(taskPrioritySelect).toHaveValue('medium');
      expect(mockedOnChangePriority).toHaveBeenCalledTimes(1);
    });

    it('Change deadline value', async () => {
      const { rerender } = render(<TaskForm />);
      const mockedOnChangeDeadline = jest.spyOn(taskFormActions, 'onChangeDeadLine');

      const user = userEvent.setup();
      const taskDeadLineInput = screen.getByPlaceholderText('01-01-2025');

      await user.clear(taskDeadLineInput);
      await user.type(taskDeadLineInput, '2025-02-10');

      rerender(<TaskForm />);

      expect(taskDeadLineInput).toHaveValue('2025-02-10');
      expect(mockedOnChangeDeadline).toHaveBeenCalledTimes(1);
    });

    it('Change tag name value', async () => {
      const { rerender } = render(<TaskForm />);
      const mockedOnChangeTagName = jest.spyOn(taskFormActions, 'onChangeTagName');
      const user = userEvent.setup();
      const taskTagNameInput = screen.getByPlaceholderText('#Тэг');

      await user.type(taskTagNameInput, 'New tag');

      rerender(<TaskForm />);

      expect(taskTagNameInput).toHaveValue('New tag');
      expect(mockedOnChangeTagName).toHaveBeenCalledTimes(7);
    });

    it('Pick tag color value', async () => {
      const { rerender } = render(<TaskForm />);
      const mockedOnPickTagColor = jest.spyOn(taskFormActions, 'onPickTagColor');
      const taskPickColorInput = screen.getByTestId('task-tag-name');

      fireEvent.input(taskPickColorInput, { target: { value: '#333333' } });

      rerender(<TaskForm />);

      expect(taskPickColorInput).toHaveValue('#333333');
      expect(mockedOnPickTagColor).toHaveBeenCalledTimes(1);
    });
  });

  describe('Form tags logic', () => {
    const mockState: FormTaskData = {
      mode: 'add',
      task: {
        title: '',
        description: '',
        type: 'task',
        status: 'to-do',
        created: createDate(new Date()),
        deadline: null,
        priority: 'low',
        tags: [],
        id: '',
      },
      currentTagToAdd: { name: '', color: '#000000' },
    };

    beforeEach(() => {
      mockedUseAppSelector.mockReturnValue(mockState);
      mockedUseAppDispatch.mockReturnValue(mockDispatch);

      mockDispatch.mockImplementation((action) => {
        console.log(action);
        switch (action.type) {
          case 'taskForm/onChangeTagName':
            return (mockState.currentTagToAdd.name += action.payload.name);
          case 'taskForm/onPickTagColor':
            return (mockState.currentTagToAdd.color = action.payload.color);
          case 'taskForm/onAddNewTag':
            mockState.task.tags.push({
              name: mockState.currentTagToAdd.name,
              color: mockState.currentTagToAdd.color,
            });
            mockState.currentTagToAdd.name = '';
            mockState.currentTagToAdd.color = '#000000';
            return;
          case 'taskForm/onRemoveTag':
            return (mockState.task.tags = mockState.task.tags.filter(
              (tag) => tag.name !== action.payload.name,
            ));
        }
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Add new tag', async () => {
      const { rerender } = render(<TaskForm />);
      const user = userEvent.setup();
      const mockedAddNewTag = jest.spyOn(taskFormActions, 'onAddNewTag');
      const taskPickColorInput = screen.getByTestId('task-tag-name');
      const taskTagNameInput = screen.getByPlaceholderText('#Тэг');
      const addTagButton = screen.getByText('+');

      await user.type(taskTagNameInput, 'New tag');
      fireEvent.input(taskPickColorInput, { target: { value: '#333333' } });
      fireEvent.click(addTagButton);

      rerender(<TaskForm />);

      expect(mockedAddNewTag).toHaveBeenCalledTimes(1);
      expect(taskTagNameInput).toHaveValue('');
      expect(taskPickColorInput).toHaveValue('#000000');
      expect(screen.getByText('New tag')).toBeInTheDocument();
    });

    it('Remove tag', async () => {
      render(<TaskForm />);

      const mockedRemoveTag = jest.spyOn(taskFormActions, 'onRemoveTag');
      const removeTagButton = screen.getByTestId('tag-close');

      expect(removeTagButton).toBeInTheDocument();

      fireEvent.click(removeTagButton);

      expect(mockedRemoveTag).toHaveBeenCalledTimes(1);
      waitFor(async () => expect(screen.queryByText('New tag')).not.toBeInTheDocument());
    });
  });

  describe('Form tasks logic', () => {
    it('Clear after save add new task', async () => {
      const mockState: FormTaskData = {
        mode: 'add',
        task: {
          title: 'New title',
          description: 'New desc',
          type: 'feature',
          status: 'to-do',
          created: createDate(new Date()),
          deadline: '2025-02-10',
          priority: 'medium',
          tags: [{ name: 'New tag', color: '#333333' }],
          id: '',
        },
        currentTagToAdd: { name: '', color: '#000000' },
      };

      mockedUseAppSelector.mockReturnValue(mockState);
      mockedUseAppDispatch.mockReturnValue(mockDispatch);

      mockDispatch.mockImplementation((action) => {
        switch (action.type) {
          case 'taskForm/onClearTask':
            return (mockState.task = {
              title: '',
              description: '',
              type: 'task',
              status: 'to-do',
              created: createDate(new Date()),
              deadline: '',
              priority: 'low',
              tags: [],
              id: '',
            });
        }
      });

      const { rerender } = render(<TaskForm />);
      const mockedOnClearTask = jest.spyOn(taskFormActions, 'onClearTask');
      const mockedToggleSideBar = jest.spyOn(sideBarActions, 'toggleSideBar');
      const saveButton = screen.getByRole('button');

      fireEvent.click(saveButton);

      rerender(<TaskForm />);

      const taskTitleInput = screen.getByPlaceholderText('Тестовая задача');
      const taskDescriptionInput = screen.getByPlaceholderText('Описание вашей прекрасной задачи');
      const taskTypeSelect = screen.getByTestId('task-type-select');
      const taskPrioritySelect = screen.getByTestId('task-priority-select');
      const taskDeadLineInput = screen.getByPlaceholderText('01-01-2025');
      const taskTagNameInput = screen.getByPlaceholderText('#Тэг');
      const taskPickColorInput = screen.getByTestId('task-tag-name');

      expect(mockAddTask).toHaveBeenCalledTimes(1);
      expect(mockedOnClearTask).toHaveBeenCalled();
      expect(mockedToggleSideBar).toHaveBeenCalled();
      expect(taskTitleInput).toHaveValue('');
      expect(taskDescriptionInput).toHaveValue('');
      expect(taskTypeSelect).toHaveValue('task');
      expect(taskPrioritySelect).toHaveValue('low');
      expect(taskDeadLineInput).toHaveValue('');
      expect(taskTagNameInput).toHaveValue('');
      expect(taskPickColorInput).toHaveValue('#000000');
    });
  });

  it('Clear after save edited task', async () => {
    const mockState: FormTaskData = {
      mode: 'edit',
      task: {
        title: 'New title',
        description: 'New desc',
        type: 'feature',
        status: 'to-do',
        created: createDate(new Date()),
        deadline: '2025-02-10',
        priority: 'medium',
        tags: [{ name: 'New tag', color: '#333333' }],
        id: '',
      },
      currentTagToAdd: { name: '', color: '#000000' },
    };

    mockedUseAppSelector.mockReturnValue(mockState);
    mockedUseAppDispatch.mockReturnValue(mockDispatch);

    mockDispatch.mockImplementation((action) => {
      switch (action.type) {
        case 'taskForm/onClearTask':
          return (mockState.task = {
            title: '',
            description: '',
            type: 'task',
            status: 'to-do',
            created: createDate(new Date()),
            deadline: '',
            priority: 'low',
            tags: [],
            id: '',
          });
      }
    });

    const { rerender } = render(<TaskForm />);
    const mockedOnClearTask = jest.spyOn(taskFormActions, 'onClearTask');
    const mockedToggleSideBar = jest.spyOn(sideBarActions, 'toggleSideBar');
    const saveButton = screen.getByRole('button');

    fireEvent.click(saveButton);

    rerender(<TaskForm />);

    const taskTitleInput = screen.getByPlaceholderText('Тестовая задача');
    const taskDescriptionInput = screen.getByPlaceholderText('Описание вашей прекрасной задачи');
    const taskTypeSelect = screen.getByTestId('task-type-select');
    const taskPrioritySelect = screen.getByTestId('task-priority-select');
    const taskDeadLineInput = screen.getByPlaceholderText('01-01-2025');
    const taskTagNameInput = screen.getByPlaceholderText('#Тэг');
    const taskPickColorInput = screen.getByTestId('task-tag-name');

    expect(mockUpdateTask).toHaveBeenCalledTimes(1);
    expect(mockedOnClearTask).toHaveBeenCalled();
    expect(mockedToggleSideBar).toHaveBeenCalled();
    expect(taskTitleInput).toHaveValue('');
    expect(taskDescriptionInput).toHaveValue('');
    expect(taskTypeSelect).toHaveValue('task');
    expect(taskPrioritySelect).toHaveValue('low');
    expect(taskDeadLineInput).toHaveValue('');
    expect(taskTagNameInput).toHaveValue('');
    expect(taskPickColorInput).toHaveValue('#000000');
  });
});
