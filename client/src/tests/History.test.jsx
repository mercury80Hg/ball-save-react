import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import History from '../routes/History';
import { MemoryRouter } from 'react-router-dom';

function renderComponent() {
  const user = {
    _id: '1234c56789f101c112daa131',
    initials: 'GOD',
    email: 'heaven@email.com',
  };

  const scoreHistory = [
    {
      externalMachineId: '4032',
      imgUrl:
        'https://img.opdb.org/0fd1477a-cf84-49d6-8495-d58d26c34529-medium.jpg',
      name: 'Medieval Madness',
      scores: [100000000, 200000],
      _id: '6460ccb00e4a1a509837fc7a',
    },
    {
      externalMachineId: '966',
      imgUrl:
        'https://img.opdb.org/6ff7016e-5d1c-4615-b9c8-2aa6d7979b0d-medium.jpg',
      name: 'Funhouse',
      scores: [2000000000],
      __v: 0,
      _id: '64625c35142e9943ac050489',
    },
  ];

  return render(
    <MemoryRouter>
      <History user={user} scoreHistory={scoreHistory} />
    </MemoryRouter>
  );
}

test('renders two scores', () => {
  renderComponent();


});

test('should render two photos', () => {
  renderComponent();

  
});
