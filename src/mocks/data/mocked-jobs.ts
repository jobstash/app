import type { Job } from '~/core/interfaces';

export const mockedJobs: Job[] = [
  {
    id: 0,
    title: 'Account Lead',
    role: 'Senior',
    salary: { min: 130_000, max: 180_000 },
    strat: 'Remote',
    teamSize: 14,
    tz: 'UTC',
    tags: [
      {
        name: 'React',
        isChecked: false,
      },
      {
        name: 'Jest',
        isChecked: true,
      },
      {
        name: 'Typescript',
        isChecked: true,
      },
    ],
    companyId: 0,
    created: '3 days ago',
  },
  {
    id: 1,
    title: 'Senior Frontend Developer',
    role: 'Senior',
    salary: { min: 100_000, max: 120_000 },
    strat: 'Remote',
    teamSize: 8,
    tz: 'UTC',
    tags: [
      {
        name: 'React',
        isChecked: false,
      },
      {
        name: 'Jest',
        isChecked: true,
      },
      {
        name: 'Typescript',
        isChecked: true,
      },
    ],
    companyId: 1,
    created: '3 days ago',
  },
  {
    id: 2,
    title: 'Junior Frontend Developer',
    role: 'Senior',
    salary: { min: 80_000, max: 100_000 },
    strat: 'Remote',
    teamSize: 8,
    tz: 'UTC',
    tags: [
      {
        name: 'React',
        isChecked: false,
      },
      {
        name: 'Jest',
        isChecked: true,
      },
      {
        name: 'Typescript',
        isChecked: true,
      },
    ],
    companyId: 2,
    created: '3 days ago',
  },
];
