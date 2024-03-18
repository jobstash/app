'use client';

import dynamic from 'next/dynamic';

import { ROUTE_SECTIONS } from '~/shared/core/constants';

import { orgFiltersSearchParamsAtom } from '~/orgs/atoms/org-filters-search-params-atom';
import { orgTotalCountAtom } from '~/orgs/atoms/org-total-count-atom';
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
      <OrgList />
    </FiltersProvider>
  );
};

const FiltersSection = dynamic(() =>
  import('~/filters/components/filters-section').then((m) => m.FiltersSection),
);

const OrgList = dynamic(() =>
  import('~/orgs/components/org-list').then((m) => m.OrgList),
);
