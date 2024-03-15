import { useRouter } from 'next/router';

import { Button } from '@nextui-org/react';

import { MultiSelectFilterConfig } from '@jobstash/filters/core';
import { lato, ROUTE_SECTION } from '@jobstash/shared/core';
import { capitalize, normalizeString } from '@jobstash/shared/utils';

import { useFilterConfig } from '@jobstash/filters/state';

import { LoadingSection } from '../loading-section';

export const Categories = () => {
  const router = useRouter();
  const { data } = useFilterConfig(ROUTE_SECTION.JOBS);

  if (!data) return <LoadingSection />;

  const openCategory = (category: string) =>
    router.push(
      `${ROUTE_SECTION.JOBS}?classifications=${normalizeString(category)}`,
    );

  const categories = (
    data['classifications'] as MultiSelectFilterConfig
  ).options.map((category) => ({ category, label: sanitizeOption(category) }));

  return (
    <div className="flex flex-wrap gap-4 justify-center pt-4">
      {categories.map(({ label, category }) => (
        <Button
          key={category}
          variant="bordered"
          onClick={() => openCategory(category)}
        >
          <p className={`${lato.className} font-semibold`}>{label}</p>
        </Button>
      ))}
    </div>
  );
};

const sanitizeOption = (option: string) =>
  option.includes('_')
    ? option
        .split('_')
        .map((o) => capitalize(o, true))
        .join(' ')
    : capitalize(option, true);
