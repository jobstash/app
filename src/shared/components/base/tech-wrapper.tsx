import clsx from 'clsx';

import { lato } from '~/shared/core/constants';

const colorPool = [
  'skill1',
  'skill2',
  'skill3',
  'skill4',
  'skill5',
  'skill6',
  'skill7',
  'skill8',
  'skill9',
  'skill10',
  'skill11',
  'skill12',
];

interface Props {
  id: string;
  children: string;
  isActive?: boolean;
}

export const TechWrapper = ({ id, children, isActive }: Props) => {
  const colorIndex = getColorIndex(id, colorPool.length);

  return (
    <div
      className={clsx(
        `flex items-center justify-center rounded-sm border ${
          'border-' + colorPool[colorIndex]
        } p-1 px-1.5`,
        { 'brightness-125': Boolean(isActive) },
      )}
    >
      <span
        className={`${lato.variable} font-lato text-sm font-bold ${
          'text-' + colorPool[colorIndex]
        } antialiased`}
      >
        {children.toUpperCase()}
      </span>
    </div>
  );
};

function getColorIndex(uuid: string, N: number) {
  let pseudorandomBytes =
    uuid.slice(0, 14) + uuid.slice(15, 19) + uuid.slice(20);
  pseudorandomBytes = pseudorandomBytes.replace(/-/g, '');
  let accumulator = 0;

  const pseudoMatch = pseudorandomBytes.match(/.{1,8}/g);
  if (!pseudoMatch) return 0;

  for (const a of pseudoMatch) {
    accumulator = (accumulator + (Number.parseInt(a, 16) % N)) % N;
  }

  return accumulator; // Return the result
}
