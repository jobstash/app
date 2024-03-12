import { PrimitiveAtom } from 'jotai';

import { FilterConfigMapper } from '~/filters/components/filter-config-mapper';
import { FilterQueryInput } from '~/filters/components/filter-query-input';
import { FilterToggler } from '~/filters/components/filter-toggler';

import { TotalCount } from './total-count';

interface Props {
  countAtom: PrimitiveAtom<number | null>;
}

export const FiltersSection = ({ countAtom }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <FilterQueryInput placeholder="Enter job title, description, or organization..." />

      <FilterToggler countSection={<TotalCount countAtom={countAtom} />}>
        <FilterConfigMapper />
      </FilterToggler>
    </div>
  );
};
