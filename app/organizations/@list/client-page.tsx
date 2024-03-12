'use client';

import { ROUTE_SECTIONS } from '~/shared/core/constants';

import { orgFiltersSearchParamsAtom } from '~/orgs/atoms/org-filters-search-params-atom';
import { orgTotalCountAtom } from '~/orgs/atoms/org-total-count-atom';
import { FiltersSection } from '~/filters/components/filters-section';
import { FiltersProvider } from '~/filters/providers/filters-provider';

interface Props {
  rawSearchParams: Record<string, string>;
}

export const OrgListClientPage = ({ rawSearchParams }: Props) => {
  return (
    <FiltersProvider
      rawSearchParams={rawSearchParams}
      routeSection={ROUTE_SECTIONS.ORGS}
      atom={orgFiltersSearchParamsAtom}
    >
      <FiltersSection
        countAtom={orgTotalCountAtom}
        searchPlaceholder="Search organizations ..."
      />
    </FiltersProvider>
  );
};
