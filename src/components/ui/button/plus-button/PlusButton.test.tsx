import '@testing-library/jest-dom';

import PlusButton from './PlusButton';

import * as hooks from '../../../../hooks/hooks';
import * as sideBarActions from '../../sidebar/SideBarSlice';
import * as taskFormActions from '../../task-form/TaskFormSlice';

import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('../../../../hooks/hooks');

const mockedUseAppSelector = jest.spyOn(hooks, 'useAppSelector');
const mockedUseAppDispatch = jest.spyOn(hooks, 'useAppDispatch');

describe('PlusButton', () => {
  it('Renders correctly', () => {
    render(<PlusButton />);

    const plusButton = screen.getByTestId('plus-button');

    expect(plusButton).toBeInTheDocument();
    expect(plusButton).toHaveClass('button');
  });

  it('should dispatch actions', () => {
    const dispatch = jest.fn();
    mockedUseAppSelector.mockReturnValue(false);
    mockedUseAppDispatch.mockReturnValue(dispatch);

    const mockedOnSetMode = jest.spyOn(taskFormActions, 'onSetMode');
    const mockedOnSetNewCurrentTitle = jest.spyOn(sideBarActions, 'onSetNewCurrentTitle');
    const mockedToggleSideBar = jest.spyOn(sideBarActions, 'toggleSideBar');

    render(<PlusButton />);

    const plusButton: HTMLDivElement = screen.getByTestId('plus-button');

    expect(plusButton).toBeInTheDocument();
    expect(plusButton).toHaveClass('button');

    fireEvent.click(plusButton);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(mockedOnSetMode).toHaveBeenCalledWith({ mode: 'add' });
    expect(mockedOnSetNewCurrentTitle).toHaveBeenCalledWith({ title: 'Новая задача' });
    expect(mockedToggleSideBar).toHaveBeenCalledTimes(1);
  });
});
