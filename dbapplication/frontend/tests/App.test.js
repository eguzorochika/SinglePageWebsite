import { render, screen } from '@testing-library/react';
import App from '../src/App';  // Adjust the path if needed

test('renders Add User button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Add User/i);
  expect(buttonElement).toBeInTheDocument();
});
