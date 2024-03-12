import { PrimitiveAtom } from 'jotai';

import { FilterConfigMapper } from '~/filters/components/filter-config-mapper';
import { FilterQueryInput } from '~/filters/components/filter-query-input';
import { FilterToggler } from '~/filters/components/filter-toggler';

import { TotalCount } from './total-count';

interface Props {
  countAtom: PrimitiveAtom<number | null>;
  searchPlaceholder: string;
}

export const FiltersSection = ({ countAtom, searchPlaceholder }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <FilterQueryInput placeholder={searchPlaceholder} />

      <FilterToggler countSection={<TotalCount countAtom={countAtom} />}>
        <FilterConfigMapper />
      </FilterToggler>
    </div>
  );
};
