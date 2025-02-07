import '@testing-library/jest-dom';

import CloseButton from './CloseButton';

import * as hooks from '../../../../hooks/hooks';
import * as sideBarActions from '../../sidebar/SideBarSlice';
import * as taskFormActions from '../../task-form/TaskFormSlice';

import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('../../../../hooks/hooks');

const mockedUseAppDispatch = jest.spyOn(hooks, 'useAppDispatch');
const mockedToggleSideBar = jest.spyOn(sideBarActions, 'toggleSideBar');
const mockedOnClearTask = jest.spyOn(taskFormActions, 'onClearTask');

describe('CloseButton', () => {
  it('Renders correctly', () => {
    const dispatch = jest.fn();
    mockedUseAppDispatch.mockReturnValue(dispatch);

    render(<CloseButton />);

    const closeButton = screen.getByTestId('close-button');

    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('button');
  });

  it('should dispatch actions', () => {
    const dispatch = jest.fn();

    mockedUseAppDispatch.mockReturnValue(dispatch);

    render(<CloseButton />);

    const closeButton: HTMLDivElement = screen.getByTestId('close-button');

    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('button');

    fireEvent.click(closeButton);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(mockedToggleSideBar).toHaveBeenCalledTimes(1);
    expect(mockedOnClearTask).toHaveBeenCalledTimes(1);
  });
});
