import { memo } from 'react';

import { lato } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

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
  isChecked?: boolean;
}

const TechWrapper = ({ id, children, isChecked }: Props) => {
  const colorIndex = getColorIndex(id, colorPool.length);

  return (
    <div className="relative">
      {isChecked && (
        <>
          <div
            className={`absolute right-0 top-0 -mt-2.5 -mr-2.5 w-5 h-5 bg-${colorPool[colorIndex]} rounded-full`}
          />
          <div className="absolute right-0 top-0 -mt-[7px] -mr-2">
            <svg
              viewBox="0 0 16 16"
              className="w-4 h-4 fill-dark stroke-dark stroke-0.25"
            >
              <path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" />
            </svg>
          </div>
        </>
      )}
      <div
        className={cn(
          `flex items-center justify-center rounded-sm border ${
            'border-' + colorPool[colorIndex]
          } p-1 px-1.5`,
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
    </div>
  );
};

function getColorIndex(uuid: string, N: number) {
  let pseudorandomBytes =
    uuid.slice(0, 14) + uuid.slice(15, 19) + uuid.slice(20);
  pseudorandomBytes = pseudorandomBytes.replaceAll('-', '');
  let accumulator = 0;

  const pseudoMatch = pseudorandomBytes.match(/.{1,8}/g);
  if (!pseudoMatch) return 0;

  for (const a of pseudoMatch) {
    accumulator = (accumulator + (Number.parseInt(a, 16) % N)) % N;
  }

  return accumulator; // Return the result
}

export default memo(TechWrapper);
