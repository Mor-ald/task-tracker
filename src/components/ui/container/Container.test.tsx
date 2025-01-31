import '@testing-library/jest-dom';

import ContainerComponent from './Container';

import { render, screen } from '@testing-library/react';

describe('Container', () => {
  it('Renders correctly', () => {
    render(
      <ContainerComponent>
        <p>container</p>
      </ContainerComponent>,
    );

    const children = screen.getByText('container');
    const Container = screen.getByTestId('container');

    expect(children).toBeInTheDocument();
    expect(Container).toHaveClass('container');
  });
});
