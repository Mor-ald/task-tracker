import sideBarReducer, { toggleSideBar, onSetNewCurrentTitle } from './SideBarSlice';

describe('SideBarSlice', () => {
  it('should return the initial state', () => {
    const result = sideBarReducer(undefined, { type: '' });

    expect(result).toEqual({
      currentTitle: '',
      open: false,
    });
  });

  it('should toggleSideBar', () => {
    const action = { type: toggleSideBar.type };
    const result = sideBarReducer(
      {
        currentTitle: '',
        open: false,
      },
      action,
    );

    expect(result).toEqual({
      currentTitle: '',
      open: true,
    });
  });

  it('should set new current title', () => {
    const action = { type: onSetNewCurrentTitle.type, payload: { title: 'New title' } };
    const result = sideBarReducer(
      {
        currentTitle: '',
        open: false,
      },
      action,
    );

    expect(result).toEqual({
      currentTitle: 'New title',
      open: false,
    });
  });
});
