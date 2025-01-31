import '@testing-library/jest-dom';

import Layout from './Layout';

import { render, screen } from '@testing-library/react';

describe('Layout', () => {
  it('Renders correctly', () => {
    render(
      <Layout>
        <p>layout</p>
      </Layout>,
    );

    const children = screen.getByText('layout');
    const layout = screen.getByTestId('layout');

    expect(children).toBeInTheDocument();
    expect(layout).toHaveClass('layout');
  });
});
