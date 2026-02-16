import { describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import { CustomPagination } from './CustomPagination';
import type { ReactElement, PropsWithChildren } from 'react';

vi.mock('../ui/button', () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

const renderWithRouter = (
  component: ReactElement,
  initialEntires?: string[],
) => {
  return render(
    <MemoryRouter initialEntries={initialEntires}>{component}</MemoryRouter>,
  );
};

describe('CustomPagination', () => {
  test('should render with default values', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);

    expect(screen.getByText('Previous')).toBeDefined();
    expect(screen.getByText('Next')).toBeDefined();
    expect(screen.getByText('1')).toBeDefined();
    expect(screen.getByText('2')).toBeDefined();
    expect(screen.getByText('3')).toBeDefined();
    expect(screen.getByText('4')).toBeDefined();
    expect(screen.getByText('5')).toBeDefined();
  });

  test('should disable previous button when page is 1', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);

    const previousButton = screen.getByText('Previous');

    expect(previousButton.getAttributeNames()).toContain('disabled');
  });

  test('should disable next button when page is last page', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5']);

    const nextButton = screen.getByText('Next');

    expect(nextButton.getAttributeNames()).toContain('disabled');
  });

  test('should disable button 3 when page is 3', () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ['/?page=3']);

    const button2 = screen.getByText('2');
    const button3 = screen.getByText('3');

    expect(button2.getAttribute('variant')).toBe('outline');
    expect(button3.getAttribute('variant')).toBe('default');
  });

  test('should change page when click on number button', () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ['/?page=3']);

    const button2 = screen.getByText('2');
    const button3 = screen.getByText('3');

    expect(button2.getAttribute('variant')).toBe('outline');
    expect(button3.getAttribute('variant')).toBe('default');

    fireEvent.click(button2);

    expect(button2.getAttribute('variant')).toBe('default');
    expect(button3.getAttribute('variant')).toBe('outline');
  });
});
