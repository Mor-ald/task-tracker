import '@testing-library/jest-dom';

import Badge from './Badge';

import { render, screen } from '@testing-library/react';

describe('Badge', () => {
  it('Renders correctly', () => {
    render(<Badge text="badge" color="#000" />);

    const badgeByText = screen.getByText('badge');

    expect(badgeByText).toBeInTheDocument();
    expect(badgeByText).toHaveClass('badge');
    expect(badgeByText.style.background).toBe('rgb(0, 0, 0)');
  });
});
