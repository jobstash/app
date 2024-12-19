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

const fontColorPool = [
  'skill1fg',
  'skill2fg',
  'skill3fg',
  'skill4fg',
  'skill5fg',
  'skill6fg',
  'skill7fg',
  'skill8fg',
  'skill9fg',
  'skill10fg',
  'skill11fg',
  'skill12fg',
];

interface Props {
  id: string;
  children: string;
  isFilled?: boolean;
  isChecked?: boolean;
  canTeach?: boolean;
}

const TechWrapper = ({
  id,
  children,
  isFilled,
  isChecked,
  canTeach,
}: Props) => {
  const colorIndex = getColorIndex(id, colorPool.length);
  const skillColor = colorPool[colorIndex];
  const filledFontColor = fontColorPool[colorIndex];

  return (
    <div className="relative flex items-center justify-center">
      {isChecked && (
        <>
          <div
            className={`absolute right-0 top-0 -mt-2.5 -mr-2.5 w-5 h-5 bg-${skillColor} rounded-full`}
          />
          <div className="absolute right-0 top-0 -mt-[7px] -mr-2">
            {canTeach ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                data-slot="icon"
                className="w-4 h-4 stroke-dark -mt-[2px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 16 16"
                className="w-4 h-4 fill-dark stroke-dark stroke-0.25"
              >
                <path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" />
              </svg>
            )}
          </div>
        </>
      )}
      <div
        className={cn(
          `flex items-center justify-center rounded-sm border ${
            'border-' + skillColor
          } ${'text-' + skillColor} p-1 px-1.5`,
          { [`bg-${skillColor} text-${filledFontColor}`]: isFilled },
        )}
      >
        <span
          className={`${lato.variable} font-lato text-sm font-bold antialiased`}
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
