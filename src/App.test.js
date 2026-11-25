import { render, screen } from '@testing-library/react';
import App from './App';

// בדיקת דמו שנוצרה אוטומטית; אינה מתאימה כרגע למערכת Course Management.

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
