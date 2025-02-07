import '@testing-library/jest-dom';

import MenuButton from './MenuButton';

import { render, screen } from '@testing-library/react';

describe('MenuButton', () => {
  it('Renders correctly', () => {
    render(<MenuButton />);

    const menuButton = screen.getByTestId('menu-button');

    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveClass('button');
  });
});
