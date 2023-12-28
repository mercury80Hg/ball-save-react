import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import Add from '../routes/Add';
import { MemoryRouter } from 'react-router-dom';
import * as api from '../api/api'

function renderComponent() {
  const user = {
    _id: '6460c66944f735c299daa176',
    initials: 'XYZ',
    email: 'testemail@email.com',
  };

  const machines = [
    {
      name: 'The Flintstones',
      ipdb_id: 888,
      opdb_id: 'abc',
      opdb_img: null,
    },
    {
      name: 'Medieval Madness',
      ipdb_id: 999,
      opdb_id: 'def',
      opdb_img: 'https://wikipedia.org/some-img.png',
    },
  ];
  const mock = jest.fn();

  return render(
    <MemoryRouter>
      <Add user={user} machines={machines} setScoreHistory={mock} />
    </MemoryRouter>
  ); 
} 

test('Add component renders 3 inputs and 2 buttons', async () => {
  renderComponent();

  const machineInput = screen.getByRole('combobox', {
    name: /pinball machine/i,
  });
  const locationInput = screen.getByRole('textbox', {
    name: /machine location/i,
  });
  const scoreInput = screen.getByRole('spinbutton', { name: /score/i });
  const addButton = screen.getByRole('button', { name: /add/i });
  const cameraButton = screen.getByRole('img', { name: /camera button/i });

  expect(scoreInput).toBeInTheDocument();
  expect(machineInput).toBeInTheDocument();
  expect(locationInput).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
  expect(cameraButton).toBeInTheDocument();
});

test('should render props user, machines', async () => {
  renderComponent();

  const machineInput = screen.getByRole('combobox', {
    name: /pinball machine/i,
  });

  expect(screen.getByRole('textbox', /testemail/i));
  expect(screen.getByRole('textbox', /xyz/i)); 

  user.click(machineInput);

  // datalist > options are not supported by RTL
  const options = screen.getByTestId('datalist').getElementsByTagName('option');
  expect(options[0]).toHaveValue('The Flintstones');
  expect(options[1]).toHaveValue('Medieval Madness');
});

test('should submit data when form is filled and Add is clicked', async () => {
  renderComponent()
  
  const scoreHistory = [
    {
      email: 'scooby@doo.com',
      externalMachineId: '6460c66944f735c299daa176',
      machineImgUrl: 'https://altpic.com',
      machineName: 'The Flintstones',
      score: [9876543210],
    },
    {
      email: 'scooby@doo.com',
      externalMachineId: '4592c8573f735c299crf123',
      machineImgUrl: 'https://somepic.com',
      machineName: 'Medieval Madness',
      score: [1000, 2000, 3000],
    }
  ]

  const apiSpy = jest.spyOn(api, 'addScore')

  const machineTextInput = screen.getByRole('combobox', {
    name: /pinball machine/i,
  });
  const locationTextInput = screen.getByRole('textbox', {
    name: /machine location/i,
  });
  const scoreTextInput = screen.getByRole('spinbutton', { name: /score/i });
  const addButton = screen.getByRole('button', { name: /add/i });

  user.click(machineTextInput)
  user.keyboard('The Flintstones')
 
  user.click(locationTextInput)
  user.keyboard('My House')

  user.click(scoreTextInput)
  user.keyboard('9876543210') 

  user.click(addButton)
  
  await waitFor(() => expect(machineTextInput).toHaveValue(''))
  expect(locationTextInput).toHaveValue('') 
  expect(scoreTextInput).toHaveValue(null)
  expect(apiSpy).toHaveBeenCalled()
 
 
}) 
