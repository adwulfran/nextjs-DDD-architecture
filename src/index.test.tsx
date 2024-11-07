import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import IndexPage from './pages'
import { readEvents } from '../db'
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

// eslint-disable-next-line @typescript-eslint/no-require-imports
jest.mock('next/router', () => require('next-router-mock'));

describe('IndexPage', () => {
  it('renders matching search', () => {
    const push = jest.fn();
    mockRouter.push = push;
    const events = readEvents();
    render(<IndexPage events={events} />)

    const input = screen.getByTestId('input-field');
    const button = screen.getByTestId('submit-button');

    userEvent.type(input, 'dermatologue');

    userEvent.click(button);

    expect(screen.getByTestId('submitted-text')).toHaveTextContent('Dermatologue');
  })
})