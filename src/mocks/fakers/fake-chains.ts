import { faker } from '@faker-js/faker';

import type { Chain } from '~/core/interfaces';

export const poolChains = [
  'Cardano ADA',
  'Cronos',
  'Dogecoin',
  'Ethereum ETH',
  'Huobi',
  'Litecoin LTC',
  'PancakeSwap CAKE',
  'Polygon',
  'Ripple XRP',
  'Shiba',
  'Solanart',
  'TRON',
  'Uniswap UNI',
  'USD Coin USDC',
] as const;

export const fakeChain = (): Chain => {
  const name = faker.helpers.arrayElement(poolChains);
  const avatar = `/chains/${name}.png`;
  return { name, avatar };
};

export const fakeChains = (min = 5, max = 9): Chain[] =>
  faker.helpers.arrayElements(
    poolChains.map((filename) => ({
      name: filename,
      avatar: `/chains/${filename}.svg`,
    })),
    faker.datatype.number({ min, max }),
  );
