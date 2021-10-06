import { render, screen, waitFor } from '@testing-library/react';
import { Async } from '.';

describe('Async tests', () => {
  it('should renders correctly', async () => {
    render(<Async />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();

    await waitFor(() => {
      return expect(screen.getByText('button')).toBeInTheDocument();
    });
  });
});
