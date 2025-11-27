import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../components/SearchBar';

describe('SearchBar', () => {
  it('renders search input with placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Buscar ferramentas...')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<SearchBar value="Slack" onChange={() => {}} />);
    expect(screen.getByDisplayValue('Slack')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('Buscar ferramentas...');
    await user.type(input, 'Test');
    
    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it('renders search icon', () => {
    const { container } = render(<SearchBar value="" onChange={() => {}} />);
    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });
});
