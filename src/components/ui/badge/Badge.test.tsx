import '@testing-library/jest-dom';

import Badge from './Badge';

import { render, screen } from '@testing-library/react';

describe('Badge', () => {
  it('Renders correctly', () => {
    render(<Badge text="badge" type="error" />);

    const badgeByText = screen.getByText('badge');

    expect(badgeByText).toBeInTheDocument();
    expect(badgeByText).toHaveClass('badge badge-error');
  });
});
