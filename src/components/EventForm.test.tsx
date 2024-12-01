import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventForm from './EventForm';
import userEvent from '@testing-library/user-event';

describe('EventFormComponent', () => {

  it('shows an error when a past date is selected', async () => {
    const fakeOnSubmit = () => { };

    render(<EventForm onSubmit={fakeOnSubmit} />);

    const input = screen.getByLabelText('Select date');
    const pastDate = new Date('2024-01-01');

    await userEvent.type(input, pastDate.toLocaleDateString());
    await userEvent.tab(); // Blur the input

    const submitButton = screen.getByText(/submit/i);

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Must be future date')).toBeInTheDocument();
    });
  });

  /*
  it('does not show an error when a future date is selected', async () => {
    render(<DatePickerComponent />);

    const input = screen.getByLabelText('Select a date');

    // Select a date in the future (e.g., 1st Jan 3000)
    const futureDate = new Date('3000-01-01');
    await act(async () => {
      fireEvent.change(input, { target: { value: futureDate.toISOString() } });
    });

    // Assert that no error message is displayed
    await waitFor(() => {
      expect(screen.queryByText('Date must be in the future')).not.toBeInTheDocument();
    });
  });
  */
});
