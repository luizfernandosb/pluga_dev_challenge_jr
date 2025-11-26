import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AppCard } from '../AppCard';
import { App } from '@/types/app';

const mockApp: App = {
  app_id: 'test_app',
  name: 'Test App',
  color: '#FF0000',
  icon: 'https://example.com/icon.svg',
  link: 'https://example.com',
};

describe('AppCard', () => {
  it('renders app name', () => {
    render(<AppCard app={mockApp} onClick={() => {}} />);
    expect(screen.getByText('Test App')).toBeInTheDocument();
  });

  it('renders app icon with correct alt text', () => {
    render(<AppCard app={mockApp} onClick={() => {}} />);
    const icon = screen.getByAltText('Test App icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', 'https://example.com/icon.svg');
  });

  it('calls onClick when card is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<AppCard app={mockApp} onClick={handleClick} />);
    
    await user.click(screen.getByText('Test App'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has lazy loading on icon', () => {
    render(<AppCard app={mockApp} onClick={() => {}} />);
    const icon = screen.getByAltText('Test App icon');
    expect(icon).toHaveAttribute('loading', 'lazy');
  });
});
