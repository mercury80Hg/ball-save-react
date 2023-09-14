import { render, screen, within } from '@testing-library/react';
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

test('Should render two scores', () => {
  renderComponent();

  const allScoreLists = screen.getAllByRole('list')
  const individualScores = screen.getAllByRole('listitem')
  const score = screen.getByText('100,000,000')
  const score2 = screen.getByText('2,000,000,000')

  expect(allScoreLists).toHaveLength(2)
  expect(individualScores).toHaveLength(3)
  expect(score).toBeInTheDocument()
  expect(score2).toBeInTheDocument()

});

test('Should render two photos', () => {
  const {container} = renderComponent();
  
  const images = container.getElementsByClassName('score-card-img')
  expect(images).toHaveLength(2)
  
});

test('Should render two machine names', () => {
  renderComponent()

  const funhouseName = screen.getByText(/funhouse/i)
  const medievalMadnessName = screen.getByText(/medieval madness/i)

  expect(funhouseName).toBeInTheDocument()
  expect(medievalMadnessName).toBeInTheDocument()
})

test('Should render AddButton component', () => {
  renderComponent()
 
  const pinballImg = screen.getByAltText(/add a score/i)
  const pinballButton = screen.getByRole('link', { name: /add a score/i })

  expect(pinballImg).toBeInTheDocument()
  expect(pinballButton).toBeInTheDocument()
})

test('Should render NavDisplay component', () => {
  renderComponent()

  const hamburger = screen.getByRole('button', { name: /☰/i })
  const historyLink = screen.getByRole('link', { name: /history/i })
  const addLink = screen.getByRole('link', { name: 'add' })
  const initials = screen.getByText(/god/i)
  const email = screen.getByText(/heaven/i)

  expect(hamburger).toBeInTheDocument()
  expect(historyLink).toBeInTheDocument()
  expect(addLink).toBeInTheDocument()
  expect(initials).toBeInTheDocument()
  expect(email).toBeInTheDocument()
})


 