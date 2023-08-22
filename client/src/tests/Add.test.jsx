import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Add from '../routes/Add';
import { MemoryRouter } from 'react-router-dom';

function renderComponent() {
  
}

test('Add component renders 3 inputs and 2 buttons', () => {
  const mock = jest.fn()

  render(
    <MemoryRouter>
      <Add />
    </MemoryRouter>
    )
  expect(screen.getAllByRole('textbox')).toHaveLength(3)

}) 