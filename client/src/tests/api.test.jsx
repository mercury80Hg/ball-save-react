import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from './server';
import History from '../routes/History';

createServer([
  {
    path: 'https://pinballmap.com/api/v1/machines.json',
    method: 'get',
    res: (req) => {
      return {
        machines: [
          {
            id: 741,
            name: 'Eight Ball Deluxe',
            is_active: false,
            created_at: null,
            updated_at: '2023-01-17T10:44:23.225-08:00',
            ipdb_link: 'http://ipdb.org/machine.cgi?id=762',
            year: 1981,
            manufacturer: 'Bally',
            machine_group_id: null,
            ipdb_id: 762,
            opdb_id: 'G5KXk-MLB9V',
            opdb_img:
              'https://img.opdb.org/fa289985-0b62-4116-a46d-38283589b107-medium.jpg',
            opdb_img_height: 512,
            opdb_img_width: 640,
            machine_type: 'ss',
            machine_display: 'alphanumeric',
            ic_eligible: null,
          },
        ],
      };
    },
  },
]);

// TODO: finish this test
test('should fetch machines from pinballmap api', async () => {
  render();

  const fetchData = createServer();
  console.log('DATA', fetchData);
});
