import '@testing-library/jest-dom';

import SideBar from './Sidebar';

import * as hooks from '../../../hooks/hooks';

import { render, screen } from '@testing-library/react';

jest.mock('@/hooks/hooks');

const mockedUseAppSelector = jest.spyOn(hooks, 'useAppSelector');

describe('SideBar', () => {
  it('Renders correctly', () => {
    mockedUseAppSelector.mockImplementation((selector) => {
      if (selector.toString().includes('open')) return false;
      if (selector.toString().includes('currentTitle')) return 'SideBarTitle';
      return null;
    });

    render(
      <SideBar>
        <p>SideBar</p>
      </SideBar>,
    );

    const sideBar = screen.getByTestId('sidebar');
    const sideBarChildren = screen.getByText('SideBar');
    const sideBarTitle = screen.getByText('SideBarTitle');
    const sideBarCloseButton = screen.getByTestId('close-button');
    const sideBarTitleDiv = screen.getByTestId('sidebar-title');
    const sideBarContentDiv = screen.getByTestId('sidebar-content');

    expect(sideBar).toBeInTheDocument();
    expect(sideBar).toHaveClass('sidebar');

    expect(sideBarChildren).toBeInTheDocument();
    expect(sideBarTitle).toBeInTheDocument();
    expect(sideBarCloseButton).toBeInTheDocument();
    expect(sideBarTitleDiv).toBeInTheDocument();
    expect(sideBarTitleDiv).toHaveClass('sidebar-title');
    expect(sideBarContentDiv).toBeInTheDocument();
    expect(sideBarContentDiv).toHaveClass('sidebar-content');
  });

  it('Sidebar is hidden', () => {
    mockedUseAppSelector.mockImplementation((selector) => {
      if (selector.toString().includes('open')) return false;
      if (selector.toString().includes('currentTitle')) return 'SideBarTitle';
      return null;
    });

    render(
      <SideBar>
        <p>SideBar</p>
      </SideBar>,
    );

    const sideBar = screen.getByTestId('sidebar');
    expect(sideBar.style.transform).toBe('translateX(500px)');
  });

  it('Sidebar is visible', () => {
    mockedUseAppSelector.mockImplementation((selector) => {
      if (selector.toString().includes('open')) return true;
      if (selector.toString().includes('currentTitle')) return 'SideBarTitle';
      return null;
    });

    render(
      <SideBar>
        <p>SideBar</p>
      </SideBar>,
    );

    const sideBar = screen.getByTestId('sidebar');
    expect(sideBar.style.transform).toBe('translateX(0)');
  });

  it('Have correctly title', () => {
    mockedUseAppSelector.mockImplementation((selector) => {
      if (selector.toString().includes('open')) return true;
      if (selector.toString().includes('currentTitle')) return 'SideBarTitle';
      return null;
    });

    render(
      <SideBar>
        <p>SideBar</p>
      </SideBar>,
    );

    const sideBarTitle = screen.getByText('SideBarTitle');
    expect(sideBarTitle.textContent).toBe('SideBarTitle');
  });
});
