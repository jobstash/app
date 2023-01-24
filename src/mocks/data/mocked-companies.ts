import type { Company } from '~/core/types';

export const mockedCompanies: Company[] = [
  {
    id: 0,
    name: 'Uniswap',
    avatar: 'https://avatars.dicebear.com/api/identicon/uniswap.svg',
    location: 'London, UK',
    teamSize: { min: 10, max: 50 },
    dateFunding: '28 Oct, 2022',
    description:
      'Swap, earn, and build on the leading decentralized crypto trading protocol',
    tags: ['uniswap.org', 'Audits', 'Token: Yes'],
    developers: [
      'https://avatars.dicebear.com/api/identicon/dev-1.svg',
      'https://avatars.dicebear.com/api/identicon/dev-2.svg',
      'https://avatars.dicebear.com/api/identicon/dev-3.svg',
    ],
    competitors: [1],
  },

  {
    id: 1,
    name: 'Uniswap Two',
    avatar: 'https://avatars.dicebear.com/api/identicon/uniswap-two.svg',
    location: 'London, UK',
    teamSize: { min: 10, max: 50 },
    dateFunding: '28 Oct, 2022',
    description:
      'Nam iaculis arcu ornare, imperdiet leo eu, pellentesque arcu. Aliquam ut neque ut justo varius feugiat sed at erat. Vivamus scelerisque risus vel orci lacinia ultricies. Praesent at turpis justo.',
    tags: ['uniswap.org', 'Audits', 'Token: Yes'],
    developers: [
      'https://avatars.dicebear.com/api/identicon/dev-4.svg',
      'https://avatars.dicebear.com/api/identicon/dev-5.svg',
      'https://avatars.dicebear.com/api/identicon/dev-6.svg',
    ],
    competitors: [0],
  },

  {
    id: 2,
    name: 'Three Worded Company',
    avatar:
      'https://avatars.dicebear.com/api/identicon/three-worded-company.svg',
    location: 'London, UK',
    teamSize: { min: 10, max: 50 },
    dateFunding: '28 Oct, 2022',
    description:
      'Curabitur sit amet venenatis velit. Fusce lectus mi, ornare in consectetur pellentesque, sodales quis quam. Vivamus sit amet eros rhoncus, pellentesque dolor quis, euismod ante. Cras sagittis purus non sem ultricies pharetra. Aliquam facilisis ipsum ac mi placerat pretium. Aenean nec felis ac ante lacinia venenatis vel et metus. Proin cursus ligula id posuere mollis. Suspendisse congue eget nunc convallis tempus. ',
    tags: ['uniswap.org', 'Audits', 'Token: Yes'],
    developers: [
      'https://avatars.dicebear.com/api/identicon/dev-7.svg',
      'https://avatars.dicebear.com/api/identicon/dev-8.svg',
      'https://avatars.dicebear.com/api/identicon/dev-9.svg',
    ],
    competitors: [0],
  },
];
