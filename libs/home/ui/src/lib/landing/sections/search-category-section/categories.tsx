import { Button } from '@nextui-org/react';

import { MultiSelectFilterConfig } from '@jobstash/filters/core';
import { FRONTEND_URL, lato, ROUTE_SECTION } from '@jobstash/shared/core';
import {
  capitalize,
  normalizeString,
  openNewTab,
} from '@jobstash/shared/utils';

import { useFilterConfig } from '@jobstash/filters/state';

import { BrowseSection } from '../browse-section';
import { LoadingSection } from '../loading-section';

export const Categories = () => {
  const { data } = useFilterConfig(ROUTE_SECTION.JOBS);

  if (!data) return <LoadingSection />;
  const categories = (
    data['classifications'] as MultiSelectFilterConfig
  ).options.map((category) => ({ category, label: sanitizeOption(category) }));

  return (
    <>
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
      <BrowseSection isLoadingSibling={!data} />
    </>
  );
};

const sanitizeOption = (option: string) =>
  option.includes('_')
    ? option
        .split('_')
        .map((o) => capitalize(o, true))
        .join(' ')
    : capitalize(option, true);

const openCategory = (category: string) =>
  openNewTab(
    `${FRONTEND_URL}${ROUTE_SECTION.JOBS}?classifications=${normalizeString(
      category,
    )}`,
  );
