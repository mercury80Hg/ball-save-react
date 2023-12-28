import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import Login from '../routes/Login';
import { MemoryRouter } from 'react-router-dom';
import * as api from '../api/api';

test('login has 2 inputs and a button', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('img', { name: 'big black pinball' })
  ).toBeInTheDocument();

  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();

  expect(
    screen.getByRole('textbox', { name: /pinball initials/i })
  ).toBeInTheDocument();

  expect(screen.getByRole('button'));

  expect(screen.getAllByRole('textbox')).toHaveLength(2);
});

test('should be able to login', async () => {
  const newUser = {
    initials: 'sbd',
    email: 'scooby@doo.com',
  };

  const apiSpy = jest.spyOn(api, 'addUser').mockReturnValue(newUser);
  const mock = jest.fn();

  render(
    <MemoryRouter>
      <Login setCurrentUser={mock} />
    </MemoryRouter>
  );

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const initialsInput = screen.getByRole('textbox', {
    name: /pinball initials/i,
  });
  const button = screen.getByRole('button', { name: /login/i });

  expect(screen.getByText('Go Ahead, Login!')).toBeInTheDocument();

  user.click(emailInput);
  user.keyboard('scooby@doo.com');

  user.click(initialsInput);
  user.keyboard('sbd');

  user.click(button);

  expect(await screen.findByText('Loading')).toBeInTheDocument();
  expect(button).toBeDisabled();

  expect(apiSpy).toHaveBeenCalled();

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(newUser);

  await waitFor(() => expect(emailInput).toHaveValue(''));
  expect(initialsInput).toHaveValue('');
});

test('should not clear form when addUser fails', async () => {
  const apiSpy = jest.spyOn(api, 'addUser').mockReturnValue(undefined);
  const mock = jest.fn();

  render(
    <MemoryRouter>
      <Login setCurrentUser={mock} />
    </MemoryRouter>
  );

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const initialsInput = screen.getByRole('textbox', {
    name: /pinball initials/i,
  });
  const button = screen.getByRole('button', { name: /login/i });

  user.click(emailInput);
  user.keyboard('scooby@doo.com');

  user.click(initialsInput);
  user.keyboard('sbd');

  user.click(button);

  expect(await screen.findByText('Loading')).toBeInTheDocument();
  expect(apiSpy).toHaveBeenCalled();

  expect(mock).not.toHaveBeenCalled();

  await waitFor(() => expect(button).toBeEnabled());
  expect(emailInput).toHaveValue('scooby@doo.com');
  expect(initialsInput).toHaveValue('sbd');
});
