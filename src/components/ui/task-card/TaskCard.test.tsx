import '@testing-library/jest-dom';

import TaskCard from './TaskCard';

import * as hooks from '../../../hooks/hooks';
import * as sideBarActions from '../sidebar/SideBarSlice';
import * as taskFormAction from '../task-form/TaskFormSlice';

import { fireEvent, render, screen } from '@testing-library/react';

import { Task } from '@/types/Tasks';

jest.mock('@/hooks/hooks');

const mockedUseAppSelector = jest.spyOn(hooks, 'useAppSelector');
const mockedUseAppDispatch = jest.spyOn(hooks, 'useAppDispatch');

const data: Task = {
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

describe('TaskCard', () => {
  it('Renders correctly', () => {
    mockedUseAppDispatch.mockReturnValue(jest.fn());
    mockedUseAppSelector.mockReturnValue(false);

    render(<TaskCard data={data} />);

    const taskElement = screen.getByTestId('task-card');
    const taskTitle = screen.getByText(data.title);
    const taskPriorityBadge = screen.getByText(data.priority);
    const taskDescription = screen.getByText(data.description);
    const taskCreated = screen.getByText(data.created);
    const taskDeadline = screen.getByText(data.deadline!);

    expect(taskElement).toBeInTheDocument();
    expect(taskTitle).toBeInTheDocument();
    expect(taskPriorityBadge).toBeInTheDocument();
    expect(taskDescription).toBeInTheDocument();
    expect(taskCreated).toBeInTheDocument();
    expect(taskDeadline).toBeInTheDocument();

    data.tags.forEach((tag) => expect(screen.getByText(tag.name)).toBeInTheDocument());
  });

  it("Doesn't have deadline", () => {
    mockedUseAppDispatch.mockReturnValue(jest.fn());
    mockedUseAppSelector.mockReturnValue(false);

    render(<TaskCard data={{ ...data, deadline: null }} />);

    expect(screen.queryByText('Дедлайн')).not.toBeInTheDocument();
  });

  it("Doesn't have tags", () => {
    mockedUseAppDispatch.mockReturnValue(jest.fn());
    mockedUseAppSelector.mockReturnValue(false);

    render(<TaskCard data={{ ...data, tags: [] }} />);

    expect(screen.queryByText('#Тэги')).not.toBeInTheDocument();
  });

  it("Doesn't open sidebar with form", () => {
    mockedUseAppDispatch.mockReturnValue(jest.fn());
    mockedUseAppSelector.mockReturnValue(true);

    render(<TaskCard data={data} />);

    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
  });

  it('Correctly dispatch all method by double click', () => {
    mockedUseAppDispatch.mockReturnValue(jest.fn());
    mockedUseAppSelector.mockReturnValue(false);

    const mockedOnSetMode = jest.spyOn(taskFormAction, 'onSetMode');
    const mockedOnSetTask = jest.spyOn(taskFormAction, 'onSetTask');
    const mockedOnSetCurrentTitle = jest.spyOn(sideBarActions, 'onSetNewCurrentTitle');
    const mockedToggleSideBar = jest.spyOn(sideBarActions, 'toggleSideBar');

    render(<TaskCard data={data} />);

    const taskElement = screen.getByTestId('task-card');

    fireEvent.doubleClick(taskElement);

    expect(mockedOnSetMode).toHaveBeenCalledWith({ mode: 'edit' });
    expect(mockedOnSetCurrentTitle).toHaveBeenCalledWith({ title: 'Редактирование задачи' });
    expect(mockedOnSetTask).toHaveBeenCalledWith({
      ...data,
      deadline: data.deadline ? data.deadline.split('-').reverse().join('-') : data.deadline,
    });
    expect(mockedToggleSideBar).toHaveBeenCalled();
  });

  describe('Get correct color by priority', () => {
    it('Color by low priority', () => {
      mockedUseAppDispatch.mockReturnValue(jest.fn());
      mockedUseAppSelector.mockReturnValue(false);

      render(<TaskCard data={{ ...data, priority: 'low' }} />);

      expect(screen.getByText('low').style.background).toBe('rgb(103, 203, 101)');
    });

    it('Color by medium priority', () => {
      mockedUseAppDispatch.mockReturnValue(jest.fn());
      mockedUseAppSelector.mockReturnValue(false);

      render(<TaskCard data={{ ...data, priority: 'medium' }} />);

      expect(screen.getByText('medium').style.background).toBe('rgb(255, 149, 51)');
    });

    it('Color by hard priority', () => {
      mockedUseAppDispatch.mockReturnValue(jest.fn());
      mockedUseAppSelector.mockReturnValue(false);

      render(<TaskCard data={{ ...data, priority: 'hard' }} />);

      expect(screen.getByText('hard').style.background).toBe('rgb(231, 68, 68)');
    });
  });
});
