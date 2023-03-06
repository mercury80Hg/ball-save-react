/////// MOCK DATABASE ////////

export const userList = [
  {
    userId: '12345',
    initials: 'ABC',
    email: 'email@email.com',
    machines: [
      {
        machineId: 'Attack From Mars',
        locationId: 'The Nest',
        score: [
          {
            date: 'today',
            value: 4000,
          },
          {
            date: 'tomorrow',
            value: 3000,
          },
          {
            date: 'yesterday',
            value: 2000,
          },
        ],
      },
      {
        machineId: 'Attack From Mars',
        locationId: 'Ground Kontrol',
        score: [
          {
            date: 'today',
            value: 5000,
          },
          {
            date: 'tomorrow',
            value: 6000,
          },
          {
            date: 'yesterday',
            value: 7000,
          },
        ],
      },
      {
        machineId: 'Road Show',
        locationId: 'Ground Kontrol',
        score: [
          {
            date: 'today',
            value: 4444,
          },
          {
            date: 'tomorrow',
            value: 3333,
          },
          {
            date: 'yesterday',
            value: 2222,
          },
        ],
      },
      {
        machineId: 'Medieval Madness',
        locationId: 'Ground Kontrol',
        score: [
          {
            date: '',
            value: 4321,
          },
          {
            date: '',
            value: 3210,
          },
          {
            date: '',
            value: 2109,
          },
        ],
      },
    ],
  },
  {
    userId: '67890',
    initials: 'XYZ',
    email: 'raduser@email.com',
    machines: [
      {
        machineId: 'Creature from Blue Lagoon',
        locationId: 'The Nest',
        score: [
          {
            date: '',
            value: 4001,
          },
          {
            date: '',
            value: 3001,
          },
          {
            date: '',
            value: 2001,
          },
        ],
      },
    ],
  },
];
